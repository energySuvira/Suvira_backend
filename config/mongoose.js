const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
// mongoose.set('debug', true);
module.exports = {connectDB}