import mongoose from "mongoose";

async function connectdb() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successful!");
  } catch (error) {
    console.log(error);
  }
}

export default connectdb;
