import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("please provide mongodb url");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

  } catch (error) {
    console.log("Mongodb connect error", error);
    process.exit(1);
  }
}

export default connectDB;
