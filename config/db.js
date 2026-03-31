const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
    return true;
  } catch (error) {
    console.log("DB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDb;
