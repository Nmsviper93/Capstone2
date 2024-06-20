const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();


const connectDB = async () => {
    try {
        // connect to MongoDB using connection string from .env file
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        // log any errors and exit the process with failure
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;