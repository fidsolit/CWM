import mongoose, { ConnectOptions } from "mongoose";

// connecting to database
const connectDB = async () => {
  const connectionUrl: string = process.env.DB_URI as string;

  try {
    await mongoose.connect(connectionUrl, {
      // Additional options if needed can go here
    } as ConnectOptions);
    console.log("Database connected successfully");
  } catch (err: any) {
    console.error("Error connecting to the database:", err.message);
  }

  // Setting other options
  mongoose.set("strictQuery", false);
};

export default connectDB;
