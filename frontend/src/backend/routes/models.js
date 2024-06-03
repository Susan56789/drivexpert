module.exports = (app, client) => {

    // Get all car models
    app.get('/api/models', async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM model');
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

}