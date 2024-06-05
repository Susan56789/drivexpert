module.exports = (client, app, authenticate, ObjectId, jwt) => {
    const database = client.db("driveexpert");
    const cars = database.collection("cars");
    const multer = require('multer');
    const express = require('express');
    const path = require('path');
    const mime = require('mime-types');

    // Configure multer for image uploads
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
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

    // Serve static files from the 'uploads' directory
    app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
        setHeaders: (res, filePath) => {
            const type = mime.lookup(filePath);
            if (type) {
                res.setHeader('Content-Type', type);
            }
        }
    }));

    // Endpoint to post a new car
    app.post('/api/cars', authenticate, upload.array('images', 10), async (req, res) => {
        try {
            const { name, email, phone } = req.user;
            const { carName, fuelType, engineSize, mileage, price, year, currentLocation, description } = req.body;

            const images = req.files ? req.files.map(file => ({
                filename: file.filename,
                extension: file.mimetype.split('/')[1] // Extract the extension from mimetype
            })) : [];

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

            const result = await cars.insertOne(newCar);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error posting car:', error);
            res.status(500).json({ message: "Error posting car", error: error.message });
        }
    });

    // Endpoint to get all cars
    app.get('/api/cars', async (req, res) => {
        try {
            const carsList = await cars.find().toArray();
            carsList.forEach(car => {
                if (car.images && car.images.length) {
                    car.images = car.images.map(image => ({
                        filename: image.filename,
                        url: `https://drivexpert.onrender.com/uploads/${image.filename}.${image.extension}`
                    }));
                }
            });
            res.status(200).json(carsList);
        } catch (error) {
            res.status(500).json({ message: "Error fetching cars", error });
        }
    });

    // Endpoint to get all car names
    app.get('/api/car-names', async (req, res) => {
        try {
            const names = database.collection("car_names");
            const allNames = await names.find({}).toArray();
            res.status(200).json(allNames);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching car names', error: err.message });
        }
    });

    // Endpoint to get all car models
    app.get('/api/car-models', async (req, res) => {
        try {
            const models = database.collection("car_models");
            const allModels = await models.find({}).toArray();
            res.status(200).json(allModels);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching car models', error: err.message });
        }
    });

    // Endpoint to get sold cars for authenticated user
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

    // Endpoint to get a car by ID
    app.get('/api/cars/:id', async (req, res) => {
        try {
            const carId = req.params.id;

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
