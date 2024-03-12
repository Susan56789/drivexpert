module.exports = (app, client) => {

    // Get all car make
    app.get('/api/makes', async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM make');
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

}