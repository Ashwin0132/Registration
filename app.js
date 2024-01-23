// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (update the connection string)
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const User = mongoose.model('User', userSchema);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newUser = new User({ name, email, phone });
        await newUser.save();
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
