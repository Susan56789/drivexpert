const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mime = require('mime-types');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");


const app = express();
const PORT = process.env.PORT || 5000;

const ObjectId = require("mongodb").ObjectId;

// Connection URI
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri);

// Use CORS middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
        const type = mime.lookup(filePath);
        if (type) {
            res.setHeader('Content-Type', type);
        }
    }
}));


const authenticate = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        // If no token is provided, return an error
        if (!token) {
            console.error('No token provided');
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Failed to verify token:', err);
                return res.status(400).json({ message: 'Invalid token' });
            }

            // If token is valid, set the decoded payload on the request object
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error in authenticate middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
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

async function run() {
    try {
        await client.connect();
        console.log("Connected to the database");

        const database = client.db("driveexpert");
        const cars = database.collection("cars");
        const users = database.collection("users");
        console.log("Collections initialized");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

run().catch(console.dir);

// Default landing page
app.get("/", (req, res) => {
    res.send("Welcome to DrivExpert Backend!");
});


//ROUTES
require('./routes/cars')(client, app, authenticate, ObjectId, jwt);
require('./routes/users')(client, app, authenticate, bcrypt, jwt);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


