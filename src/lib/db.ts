import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    // Configure options to address TLS compatibility issues with Node.js 18
    const opts = {
      bufferCommands: false,
      autoIndex: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    };

    console.log("Creating new MongoDB connection...");

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        mongoose.connection.on("error", (err) => {
          console.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
          console.warn("MongoDB disconnected, attempting to reconnect...");
          cached.promise = null; // Reset the promise to allow reconnection
          cached.conn = null;
        });

        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        // Reset the promise so we can try again
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Failed to await MongoDB connection:", e);
    throw e;
  }

  return cached.conn;
}
