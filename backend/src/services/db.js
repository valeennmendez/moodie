import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI);
    console.log("MongoDB connected: ", db.connection.host);
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};
