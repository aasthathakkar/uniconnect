const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected at ${new Date().toLocaleString()}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;


//responsible for connecting application to mongodb using mongoose
//this code sets up the mongodb connection and handles the connection errors 
//we import it and use it for connection function in server.js