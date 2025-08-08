import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log("MONGODB_URI not found, using in-memory storage");
      return false;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.log("Falling back to in-memory storage");
    return false;
  }
};

export default connectDB;