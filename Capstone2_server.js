const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
const connectDB = require('./Capstone2_config_db');
const authRoutes = require('./Capstone2_routes_authRoutes');
const recipeRoutes = require('./Capstone2_routes_recipeRoutes')
const favoritesRoutes = require('./Capstone2_routes_favoritesRoutes');
const userRoutes = require('./Capstone2_routes_userRoutes');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

// intialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// middleware to parse JSON request bodies
app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// define simple route to check if API is running
app.get('/', (req, res) => res.send('API is running'));

// use routes for requests
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', userRoutes);

// database connection
mongoose.connect('mongodb://localhost:27017/recipeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});