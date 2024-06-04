module.exports = (client, app, authenticate, ObjectId) => {
    const database = client.db("driveexpert");
    const cars = database.collection("cars");

    app.post('/api/cars', authenticate, async (req, res) => {
        try {
            const { carName, fuelType, engineSize, mileage, price, year, currentLocation, description } = req.body;
            const images = req.files ? req.files.map(file => file.filename) : [];
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
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone
                },
                createdAt: new Date()
            };
            const result = await cars.insertOne(newCar);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Error posting car", error });
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

    // Route to view a car by ID
    app.get("/api/cars/:id", async (req, res) => {
        try {
            const car = await cars.findOne({ _id: new ObjectId(req.params.id) });
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.status(200).json(car);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching car by ID', error: err.message });
        }
    });

    // Fetch all car names
    app.get('/api/car-names', async (req, res) => {
        try {
            const database = client.db("driveexpert");
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
            const database = client.db("driveexpert");
            const models = database.collection("car_models");

            const allModels = await models.find({}).toArray();
            res.status(200).json(allModels);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching car models', error: err.message });
        }
    });
};
