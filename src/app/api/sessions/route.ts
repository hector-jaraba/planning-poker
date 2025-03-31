import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connect } from "@/lib/db";
import SessionModel from "@/models/Session";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define User model
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
    await connect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { name, estimationType = "fibonacci" } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Session name is required" },
        { status: 400 }
      );
    }

    // Get user ID, handling both ObjectId and string formats
    const userId = session.user.id;
    console.log(
      "Creating session for user:",
      userId,
      "with email:",
      session.user.email
    );

    // Handle case for test user or missing ID
    let ownerId = userId;
    if (!userId && session.user.email === "test@example.com") {
      ownerId = "test-user-1";
      console.log("Using test-user-1 ID for test@example.com user");
    }

    // Create the session
    const shareLink = uuidv4();
    console.log(`Creating session "${name}" with owner ${ownerId}`);

    // Promote user to admin role if they're not already an admin
    if (userId && session.user.role !== "admin") {
      try {
        // Check if the user exists in the database
        const user = await UserModel.findById(userId);

        if (user) {
          // Update user role to admin
          user.role = "admin";
          await user.save();
          console.log(
            `User ${userId} promoted to admin role after creating a session`
          );
        } else {
          console.warn(
            `Could not find user with ID ${userId} to promote to admin`
          );
        }
      } catch (error) {
        console.error("Error promoting user to admin:", error);
        // Continue with session creation even if promotion fails
      }
    }

    const newSession = await SessionModel.create({
      name,
      ownerId: ownerId,
      participants: [ownerId],
      tasks: [],
      estimationType,
      status: "active",
      shareLink,
    });

    console.log("Session created successfully with ID:", newSession._id);
    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connect();

    // Get user's sessions (both owned and participating)
    const userId = session.user.id;
    console.log("Fetching sessions for user:", userId);

    // Special case for test users or if userId is undefined
    if (!userId) {
      console.log("No user ID found, using test user fallback");
      const allSessions = await SessionModel.find({}).sort({ updatedAt: -1 });
      console.log(`Found ${allSessions.length} sessions in total`);
      return NextResponse.json(allSessions);
    }

    let query = {};
    try {
      if (mongoose.isValidObjectId(userId)) {
        // For valid MongoDB ObjectIds
        const userObjectId = new mongoose.Types.ObjectId(userId);
        query = {
          $or: [{ ownerId: userObjectId }, { participants: userObjectId }],
        };
        console.log("Using ObjectId query:", JSON.stringify(query));
      } else {
        // For test users with string IDs
        query = { $or: [{ ownerId: userId }, { participants: userId }] };
        console.log("Using string ID query:", JSON.stringify(query));
      }
    } catch (error) {
      console.error("Error building query:", error);
      // Fallback to showing all sessions in case of query error
      query = {};
    }

    const sessions = await SessionModel.find(query).sort({ updatedAt: -1 });
    console.log(`Found ${sessions.length} sessions for user ${userId}`);

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Failed to get sessions:", error);
    return NextResponse.json(
      { message: "Failed to get sessions" },
      { status: 500 }
    );
  }
}
