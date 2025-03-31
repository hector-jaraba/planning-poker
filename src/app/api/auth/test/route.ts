import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { hash } from "bcrypt";
import mongoose from "mongoose";

// Define User schema if not already defined
let UserModel: mongoose.Model<any>;

try {
  // Try to get the model if it exists
  UserModel = mongoose.model("User");
} catch (e) {
  // Define User schema if not already defined
  const UserSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // Create the model
  UserModel = mongoose.model("User", UserSchema);
}

export async function GET(req: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Test route only available in development mode" },
      { status: 403 }
    );
  }

  try {
    // Connect to the database
    await connect();

    // Check if test user already exists
    const existingUser = await UserModel.findOne({ email: "test@example.com" });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Test user already exists",
          user: {
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
          },
          login: {
            email: "test@example.com",
            password: "test123",
          },
        },
        { status: 200 }
      );
    }

    // Hash the password
    const hashedPassword = await hash("test123", 10);

    // Create the test user
    const user = await UserModel.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "admin", // Make test user an admin
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Test user created successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        login: {
          email: "test@example.com",
          password: "test123",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Test user creation error:", error);
    return NextResponse.json(
      { error: "Failed to create test user", details: error.message },
      { status: 500 }
    );
  }
}
