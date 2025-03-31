import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/lib/db";

export async function GET() {
  try {
    // Try to connect to MongoDB
    await connect();

    // Check connection status
    const status = mongoose.connection.readyState;
    const statusText =
      status === 1
        ? "connected"
        : status === 2
        ? "connecting"
        : status === 3
        ? "disconnecting"
        : "disconnected";

    // Return success
    return NextResponse.json({
      status: "success",
      message: `MongoDB connection test successful. Status: ${statusText}`,
      mongoVersion: mongoose.version,
      readyState: statusText,
      connectionDetails: {
        host: mongoose.connection.host,
        name: mongoose.connection.name,
      },
    });
  } catch (error) {
    console.error("MongoDB connection test failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
