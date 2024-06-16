import mongoose, { Connection } from "mongoose";

let isConnected: Connection[] | boolean = false;

const connectDB = async () => {
  if (isConnected) {
    return isConnected;
  }
  try {
    const res = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = res.connections;
    console.log("MongoDB Connected");
    return isConnected;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
