const Joi = require('joi'); // Add Joi for validation
const sharp = require('sharp'); // Add sharp for image processing


module.exports = (client, app, authenticate, ObjectId, upload, bucket) => {
    const database = client.db("driveexpert");
    const cars = database.collection("cars");

    const carSchema = Joi.object({
        carName: Joi.string().required(),
        fuelType: Joi.string().required(),
        engineSize: Joi.number().required(),
        mileage: Joi.number().required(),
        price: Joi.number().required(),
        year: Joi.number().required(),
        currentLocation: Joi.string().required(),
        description: Joi.string().required(),
        transmission: Joi.string().required(),
        condition: Joi.string().required()
    });

    const createImageURL = (filename) => `/api/images/${filename}`;

    app.post('/api/cars', authenticate, upload.array('images', 10), async (req, res) => {
        try {
            const { name, email, phone } = req.user;

            const carData = {
                carName: req.body.carName,
                fuelType: req.body.fuelType,
                engineSize: req.body.engineSize,
                mileage: req.body.mileage,
                price: req.body.price,
                year: req.body.year,
                currentLocation: req.body.currentLocation,
                description: req.body.description,
                transmission: req.body.transmission,
                condition: req.body.condition
            };

            const { error } = carSchema.validate(carData);
            if (error) {
                return res.status(400).json({ message: "Invalid data", error: error.details[0].message });
            }

            const images = [];
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const webpBuffer = await sharp(file.buffer)
                        .webp({ quality: 80 })
                        .toBuffer();

                    const uploadStream = bucket.openUploadStream(file.originalname + '.webp', {
                        contentType: 'image/webp'
                    });
                    uploadStream.end(webpBuffer);
                    images.push({ filename: file.originalname + '.webp' });
                }
            }

            const newCar = {
                ...carData,
                images,
                seller: { name, email, phone },
                createdAt: new Date()
            };

            const result = await cars.insertOne(newCar);

            res.status(201).json(result.ops[0]);
        } catch (error) {
            console.error('Error posting car:', error);
            console.error('Error details:', error.stack); // Add error stack trace
            res.status(500).json({ message: "Error posting car", error: error.message });
        }
    });

    // Route to get all cars
    app.get('/api/cars', async (req, res) => {
        try {
            const carsList = await cars.find().toArray();
            carsList.forEach(car => {
                if (car.images && car.images.length) {
                    car.images = car.images.map(image => ({
                        filename: image.filename,
                        url: createImageURL(image.filename)
                    }));
                }
            });
            res.status(200).json(carsList);
        } catch (error) {
            console.error('Error fetching cars:', error);
            res.status(500).json({ message: "Error fetching cars", error });
        }
    });

    // Route to get sold cars for the authenticated user
    app.get('/api/cars/sold', authenticate, async (req, res) => {
        try {
            const { email } = req.user;
            const soldCars = await cars.find({ 'seller.email': email }).toArray();
            soldCars.forEach(car => {
                if (car.images && car.images.length) {
                    car.images = car.images.map(image => ({
                        filename: image.filename,
                        url: createImageURL(image.filename)
                    }));
                }
            });
            res.status(200).json(soldCars);
        } catch (error) {
            console.error('Error fetching sold cars:', error);
            res.status(500).json({ message: "Error fetching sold cars", error: error.message });
        }
    });

    // Route to serve images from GridFS
    app.get('/api/images/:filename', async (req, res) => {
        try {
            const { filename } = req.params;
            const downloadStream = bucket.openDownloadStreamByName(filename);

            downloadStream.on('file', (file) => {
                res.set('Content-Type', file.contentType);
            });

            downloadStream.on('error', (err) => {
                res.status(404).json({ message: 'Image not found' });
            });

            downloadStream.pipe(res);
        } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).json({ message: 'Error fetching image', error });
        }
    });

    // Route to get a car by ID
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
                    url: createImageURL(image.filename)
                }));
            }

            res.json(car);
        } catch (error) {
            console.error('Error fetching car by ID:', error);
            res.status(500).json({ message: 'Error fetching car by ID', error });
        }
    });
};
