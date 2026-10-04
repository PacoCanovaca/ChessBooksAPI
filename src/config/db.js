const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.log(`Couldn't connect to MongoDB: ${err.message}`);
    }
}

module.exports = { connectDB }