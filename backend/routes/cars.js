const Joi = require('joi'); // Add Joi for validation

module.exports = (client, app, authenticate, ObjectId, upload) => {
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

    const createImageURL = (filename) => `https://drivexpert.vercel.app/uploads/${filename}`;

    app.post('/api/cars', authenticate, upload.array('images', 10), async (req, res) => {
        try {
            // Extract user information from authentication middleware
            const { name, email, phone } = req.user;

            // Extract and validate car data
            const { carName, fuelType, engineSize, mileage, price, year, currentLocation, description, transmission, condition } = req.body;
            const carData = { carName, fuelType, engineSize, mileage, price, year, currentLocation, description, transmission, condition };

            // Validate car data using Joi schema
            const { error } = carSchema.validate(carData);
            if (error) {
                return res.status(400).json({ message: "Invalid data", error: error.details[0].message });
            }

            // Process images if provided
            const images = req.files ? req.files.map(file => ({
                filename: file.filename,
                extension: file.mimetype.split('/')[1]
            })) : [];

            // Create new car object
            const newCar = {
                ...carData,
                images,
                seller: { name, email, phone },
                createdAt: new Date()
            };

            // Insert the new car into the database
            const result = await cars.insertOne(newCar);

            // Respond with the created car data
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