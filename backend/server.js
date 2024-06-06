require('dotenv').config();
const express = require('express');
const mime = require('mime-types');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");
const multer = require('multer');
const helmet = require('helmet');

// Validate environment variables
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error("Missing essential environment variables.");
    process.exit(1);
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

// MongoDB URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware setup
app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
    })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
        const type = mime.lookup(filePath);
        if (type) {
            res.setHeader('Content-Type', type);
        }
    }
}));

// Serve Vue.js static files
app.use(express.static(path.join(__dirname, 'dist')));

// Authentication Middleware
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(400).json({ message: 'Invalid token' });
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const mimeType = file.mimetype;
        if (mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/webp') {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and WebP files are allowed'));
        }
    }
});

// Database connection and initialization
async function run() {
    try {
        await client.connect();
        console.log("Connected to the database");

        const database = client.db("driveexpert");
        const cars = database.collection("cars");
        const users = database.collection("users");
        console.log("Collections initialized");

        // Ensure text index on 'cars' collection
        await createTextIndex(cars);

    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

const createTextIndex = async (collection) => {
    const indexes = await collection.indexes();
    const hasTextIndex = indexes.some(index => index.key && index.key._fts === "text");

    if (!hasTextIndex) {
        await collection.createIndex({ title: "text", description: "text" });
        console.log("Text index created on 'title' and 'description' fields.");
    } else {
        console.log("Text index already exists on 'title' and 'description' fields.");
    }
};

// Default landing page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Import and initialize routes
require('./routes/cars')(client, app, authenticate, ObjectId, upload);
require('./routes/users')(client, app, authenticate, bcrypt, jwt);

// Catch-all route to serve index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

run().catch(console.dir);