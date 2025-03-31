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

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Get the user data from the request
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
    });

    // Return success response without exposing the password
    return NextResponse.json(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
