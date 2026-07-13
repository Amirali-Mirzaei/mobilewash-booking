import mongoose from "mongoose";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) return;

  const config = useRuntimeConfig();

  console.log("Mongo URI exists:", !!config.mongodbUri);

  try {
    await mongoose.connect(config.mongodbUri!, {
      dbName: "carwash-booking",
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log(" MongoDB Connected ✅");

  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; 
  }
}