module.exports = (client, app, authenticate, ObjectId) => {
    // Route to fetch all cars
    app.get("/api/cars", async (req, res) => {
        try {
            const database = client.db("driveexpert");
            const cars = database.collection("cars");

            const allCars = await cars.find({}).toArray();
            res.status(200).json(allCars);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching cars', error: err.message });
        }
    });

    // Route to post a new car
    app.post("/api/cars", authenticate, async (req, res) => {
        try {
            const database = client.db("driveexpert");
            const cars = database.collection("cars");

            // Extract car data from the request body
            const { name, fuelType, engineSize, mileage, price, year, currentLocation, description, images } = req.body;

            // Validate required fields
            if (!name || !fuelType || !engineSize || !mileage || !price || !year || !currentLocation || !description || !images) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Create a new car object
            const newCar = {
                name,
                fuelType,
                engineSize,
                mileage: parseInt(mileage),
                price: parseFloat(price),
                year: parseInt(year),
                currentLocation,
                description,
                images,
                createdAt: new Date()
            };

            // Insert the new car into the database
            const result = await cars.insertOne(newCar);

            // Send a success response with the inserted car data
            res.status(201).json({ _id: result.insertedId, ...newCar });
        } catch (err) {
            // Send an error response if something goes wrong
            res.status(500).json({ message: 'Error posting car', error: err.message });
        }
    });

    // Route to view a car by ID
    app.get("/api/cars/:id", async (req, res) => {
        try {
            const database = client.db("driveexpert");
            const cars = database.collection("cars");

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
