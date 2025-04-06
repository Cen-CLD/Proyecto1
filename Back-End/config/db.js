const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { logError } = require('../utils/logger');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName: 'project1'});
    } catch (error) {
        logError(error);
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
