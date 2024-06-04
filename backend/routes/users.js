
module.exports = (client, app, authenticate, bcrypt, jwt) => {
    const database = client.db("driveexpert");
    const users = database.collection("users");

    app.post('/api/users/register', async (req, res) => {
        try {
            const { name, email, password, phone } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { name, email, password: hashedPassword, phone };
            const result = await users.insertOne(newUser);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error });
        }
    });

    app.post('/api/users/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await users.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

            const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, 'secretkey', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Error logging in user", error });
        }
    });

    app.get('/api/users/profile', authenticate, (req, res) => {
        res.json(req.user);
    });

    app.post('/api/users/reset-password', async (req, res) => {
        try {
            const { email } = req.body;
            const user = await users.findOne({ email });
            if (!user) return res.status(400).json({ message: 'User not found' });

            // Generate a password reset token (implement this function according to your requirements)
            const resetToken = jwt.sign({ _id: user._id, email: user.email }, 'resetsecretkey', { expiresIn: '1h' });

            // Send the reset token via email (implement the sendResetEmail function according to your requirements)
            await sendResetEmail(user.email, resetToken);

            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            res.status(500).json({ message: "Error sending reset password email", error });
        }
    });

    app.post('/api/users/reset-password/:token', async (req, res) => {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            const decoded = jwt.verify(token, 'resetsecretkey');

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await users.updateOne({ _id: decoded._id }, { $set: { password: hashedPassword } });

            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ message: "Error resetting password", error });
        }
    });

}