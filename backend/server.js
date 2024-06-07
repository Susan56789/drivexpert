require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const multer = require('multer');
const helmet = require('helmet');
const sharp = require('sharp');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({
    crossOriginEmbedderPolicy: false,
}));

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
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

// Connect to the database and initialize collections
const run = async () => {
    try {
        await client.connect();
        console.log("Connected to the database");

        const database = client.db("driveexpert");
        const cars = database.collection("cars");
        const users = database.collection("users");
        const bucket = new GridFSBucket(database, {
            bucketName: 'images'
        });
        console.log("Collections initialized");

        // Ensure text index on 'cars' collection
        await createTextIndex(cars);

        // Import and initialize routes
        require('./routes/cars')(client, app, authenticate, ObjectId, upload, bucket);
        require('./routes/users')(client, app, authenticate, bcrypt, jwt);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};

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

run().catch(console.dir);

// Close MongoDB connection on server shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
