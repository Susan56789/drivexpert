module.exports = (client, app, authenticate, ObjectId, jwt) => {
    const database = client.db("driveexpert");
    const cars = database.collection("cars");
    const multer = require('multer');

    const path = require('path');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
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



    app.post('/api/cars', authenticate, upload.array('images', 10), async (req, res) => {
        try {
            const { name, email, phone } = req.user;
            const { carName, fuelType, engineSize, mileage, price, year, currentLocation, description } = req.body;

            const images = req.files ? req.files.map(file => ({
                filename: file.filename,
                extension: file.mimetype.split('/')[1]
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
                seller: { name, email, phone },
                createdAt: new Date()
            };

            const result = await cars.insertOne(newCar);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error posting car:', error);
            res.status(500).json({ message: "Error posting car", error: error.message });
        }
    });

    app.get('/api/cars', async (req, res) => {
        try {
            const carsList = await cars.find().toArray();
            carsList.forEach(car => {
                if (car.images && car.images.length) {
                    car.images = car.images.map(image => ({
                        filename: image.filename,
                        url: `https://drivexpert.onrender.com/uploads/${image.filename}`
                    }));
                }
            });
            res.status(200).json(carsList);
        } catch (error) {
            res.status(500).json({ message: "Error fetching cars", error });
        }
    });

    // New endpoint for fetching sold cars by authenticated user
    app.get('/api/cars/sold', authenticate, async (req, res) => {
        try {
            const { email } = req.user;  // Get user's email from the authentication middleware

            // Find cars sold by this user
            const soldCars = await cars.find({ 'seller.email': email }).toArray();

            // Attach image URLs to the response
            soldCars.forEach(car => {
                if (car.images && car.images.length) {
                    car.images = car.images.map(image => ({
                        filename: image.filename,
                        url: `https://drivexpert.onrender.com/uploads/${image.filename}`
                    }));
                }
            });

            res.status(200).json(soldCars);
        } catch (error) {
            console.error('Error fetching sold cars:', error);
            res.status(500).json({ message: "Error fetching sold cars", error: error.message });
        }
    });

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

            if (car.images && car.images.length) {
                car.images = car.images.map(image => ({
                    filename: image.filename,
                    url: `https://drivexpert.onrender.com/uploads/${image.filename}`
                }));
            }

            res.json(car);
        } catch (error) {
            console.error('Error fetching car by ID:', error);
            res.status(500).json({ message: 'Error fetching car by ID', error });
        }
    });
};
