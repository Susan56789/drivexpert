const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });
if (result.error) {
    throw result.error;
}


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'drivexpert',
    password: 'admin',
    port: 5432, // Default PostgreSQL port
});


// Test the database connection
client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the database');
    }
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

client.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to POSTGRESQL database');

});

//API ROUTES
require('./routes/cars')(app, client);



// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});