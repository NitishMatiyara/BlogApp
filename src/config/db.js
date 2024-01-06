import mongoose from "mongoose";
const DATABASE_URL =
  "mongodb+srv://nitishmatiyara:FIAoVi9f7O6CyYZm@cluster0.ocygt.mongodb.net/";
// Database configuration
const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "blog",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Mongo db Connected Successfully...");
  } catch (error) {
    console.log("MongoDb connection failed", error);
  }
};

export default connectDB;
