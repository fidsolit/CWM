import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/cwm"
    );
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default dbConnect;
