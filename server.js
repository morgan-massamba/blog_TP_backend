const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth');
const itemRouter = require('./routes/item');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(
            `Successfully connected to MongoDB. Server listening at http://localhost:${PORT}`
        );
    } catch (error) {
        console.log(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/api', itemRouter);
