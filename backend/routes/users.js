
module.exports = (client, app, authenticate) => {
    // Route to post seller information
    app.post("/api/users", authenticate, async (req, res) => {
        try {
            const database = client.db("driveexpert");
            const users = database.collection("users");

            const newSeller = req.body;
            const result = await users.insertOne(newSeller);
            res.status(201).json(result.ops[0]);
        } catch (err) {
            res.status(500).json({ message: 'Error posting seller information', error: err.message });
        }
    });

}