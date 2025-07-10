const mongoose = require("mongoose");


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Connection failed", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;