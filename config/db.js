const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully");
      return mongoose.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error(
        "MongoDB Connection Failed:",
        error.message
      );
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;