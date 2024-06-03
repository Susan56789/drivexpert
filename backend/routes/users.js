
module.exports = (client, app, authenticate) => {
    // Route to post seller information
    app.post("/api/users", authenticate, async (req, res) => {
        try {
            const database = client.db("driveexpert");
            const users = database.collection("users");

            // Extract user data from the request body
            const { name, email, phone } = req.body;

            // Validate required fields
            if (!name || !email || !phone) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Check if the email is already registered
            const existingUser = await users.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already registered' });
            }

            // Create a new user object
            const newSeller = {
                name,
                email,
                phone,
                createdAt: new Date()
            };

            // Insert the new user into the database
            const result = await users.insertOne(newSeller);

            // Send a success response with the inserted user data
            res.status(201).json({ _id: result.insertedId, ...newSeller });
        } catch (err) {
            // Send an error response if something goes wrong
            res.status(500).json({ message: 'Error posting seller information', error: err.message });
        }
    });

}