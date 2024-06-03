module.exports = (app, client) => {

    // Get all cars
    app.get('/api/cars', async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM cars');
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });




}