import mongoose from "mongoose";

// Database configuration
const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "blog",
    };
    await mongoose.connect(process.env.MONGO_URI, DB_OPTIONS);
    console.log("Mongo db Connected Successfully...");
  } catch (error) {
    console.log("MongoDb connection failed", error);
  }
};

export default connectDB;
