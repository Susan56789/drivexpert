module.exports = (client, app, authenticate, ObjectId, jwt) => {
    const database = client.db("driveexpert");
    const cars = database.collection("cars");
    const multer = require('multer');
    const upload = multer({
        dest: 'uploads/',
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
                cb(null, true);
            } else {
                cb(new Error('Only JPEG, PNG, and WebP files are allowed'));
            }
        }
    }); // Allow JPEG, PNG, and WebP files
    const express = require('express');
    const path = require('path');


    // Set up static file serving
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.post('/api/cars', authenticate, upload.array('images', 10), async (req, res) => {
        try {
            // Extract user information from the authenticated request
            const { name, email, phone } = req.user;

            // Log the request body and files
            console.log('Request Body:', req.body);
            console.log('Request Files:', req.files);

            // Extract car details from the request body
            const { carName, fuelType, engineSize, mileage, price, year, currentLocation, description } = req.body;

            // Extract uploaded image filenames (assuming req.files is an array of files)
            const images = req.files ? req.files.map(file => file.filename) : [];

            // Create a new car object with seller information and timestamps
            const newCar = {
                carName,
                fuelType,
                engineSize,
                mileage,
                price,
                year,
                currentLocation,
                description,
                images,
                seller: {
                    name,
                    email,
                    phone
                },
                createdAt: new Date()
            };

            // Insert the new car into the database
            const result = await cars.insertOne(newCar);

            // Send a 201 Created response with the result
            res.status(201).json(result);
        } catch (error) {
            // Handle errors and send a 500 Internal Server Error response
            console.error('Error posting car:', error);
            res.status(500).json({ message: "Error posting car", error: error.message });
        }
    });


    app.get('/api/cars', async (req, res) => {
        try {
            const carsList = await cars.find().toArray();
            res.status(200).json(carsList);
        } catch (error) {
            res.status(500).json({ message: "Error fetching cars", error });
        }
    });



    // Fetch all car names
    app.get('/api/car-names', async (req, res) => {
        try {
            const names = database.collection("car_names");
            const allNames = await names.find({}).toArray();
            res.status(200).json(allNames);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching car names', error: err.message });
        }
    });

    // Fetch all car models
    app.get('/api/car-models', async (req, res) => {
        try {
            const models = database.collection("car_models");
            const allModels = await models.find({}).toArray();
            res.status(200).json(allModels);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching car models', error: err.message });
        }
    });

    app.get('/api/cars/sold', authenticate, async (req, res) => {
        try {
            const userEmail = req.user.email;

            if (!userEmail) {
                return res.status(400).json({ message: 'Invalid user email' });
            }

            const soldCars = await cars.find({ "seller.email": userEmail }).toArray();
            res.json(soldCars);
        } catch (error) {
            console.error('Error fetching sold cars:', error);
            res.status(500).json({ message: 'Error fetching sold cars', error });
        }
    });


    // Get car by ID
    app.get('/api/cars/:id', async (req, res) => {
        try {
            const carId = req.params.id;

            // Validate and convert the car ID to an ObjectId
            if (!ObjectId.isValid(carId)) {
                return res.status(400).json({ message: 'Invalid car ID format' });
            }

            const objectId = new ObjectId(carId);
            const car = await cars.findOne({ _id: objectId });

            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }

            res.json(car);
        } catch (error) {
            console.error('Error fetching car by ID:', error);
            res.status(500).json({ message: 'Error fetching car by ID', error });
        }
    });

};
