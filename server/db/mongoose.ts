import mongoose from "mongoose";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) return;

  const { mongodbUri } = useRuntimeConfig();

  if (!mongodbUri) {
    throw new Error("MongoDB URI is missing.");
  }

  try {
    await mongoose.connect(mongodbUri);

    isConnected = true;

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(error);

    throw new Error("Failed to connect to MongoDB.");
  }
}