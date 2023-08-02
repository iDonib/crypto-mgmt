const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log(`MongoDB connected successfully!`);
    })
    .catch((error) => {
      console.log(`MongoDB connection failed! Error: ${error}`);
    });
};

module.exports = connectDb;
