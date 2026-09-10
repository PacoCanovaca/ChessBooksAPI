const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to the DB successfully');
    } catch (err) {
        console.log(`Couldn't connect to the DB: ${err.message}`);
    }
}

module.exports = { connectDB }