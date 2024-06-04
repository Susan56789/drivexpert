module.exports = (client, app, authenticate, ObjectId, jwt) => {
    const database = client.db("driveexpert");
    const cars = database.collection("cars");

    app.post('/api/cars', authenticate, async (req, res) => {
        try {
            // Verify and decode the token
            const decodedToken = jwt.verify(process.env.JWT_SECRET || 'secretkey');

            // Extract user information from the decoded token
            const { name, email, phone } = decodedToken;

            // Extract car details from the request body
            const { carName, fuelType, engineSize, mileage, price, year, currentLocation, description } = req.body;

            // Extract uploaded image filenames
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

    app.get('/api/cars/sold', authenticate, async (req, res) => {
        try {
            const userId = req.user._id;


            const soldCars = await cars.find({ sellerId: userId }).toArray();

            res.json(soldCars);
        } catch (error) {
            console.error('Error fetching sold cars:', error);
            res.status(500).json({ message: 'Error fetching sold cars', error });
        }
    });

};
