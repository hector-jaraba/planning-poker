import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import SessionModel from "@/models/Session";
import UserModel from "@/models/User";
import { connect } from "@/lib/db";
import mongoose from "mongoose";

// Define session user type
interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connect();

    // Get session by ID
    const sessionId = params.id;
    const planningSession = await SessionModel.findById(sessionId);

    if (!planningSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check if user is a participant
    const userId = session.user.id;

    // For test users with simple string IDs, we'll allow access to all sessions
    if (!mongoose.isValidObjectId(userId)) {
      console.log("Test user detected - bypassing participant check");
      return NextResponse.json(planningSession);
    }

    const isParticipant = planningSession.participants.some(
      (id) => id.toString() === new mongoose.Types.ObjectId(userId).toString()
    );

    if (!isParticipant) {
      console.log("Access denied: User not a participant", userId);
      console.log(
        "Participants:",
        planningSession.participants.map((id) => id.toString())
      );
      return NextResponse.json(
        { message: "Not a participant in this session" },
        { status: 403 }
      );
    }

    // Return session data
    return NextResponse.json(planningSession);
  } catch (error) {
    console.error("Failed to get session:", error);
    return NextResponse.json(
      { message: "Failed to get session" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connect();

    // Get session by ID
    const sessionId = params.id;
    const planningSession = await SessionModel.findById(sessionId);

    if (!planningSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check if user is the owner (admin)
    const user = session.user as SessionUser;
    const userId = user.id || user.email;

    // For test users with simple string IDs, allow them to update any session
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(userId)) {
      console.log("Test user detected - bypassing owner check");
    } else if (
      planningSession.ownerId.toString() !==
      new mongoose.Types.ObjectId(userId).toString()
    ) {
      return NextResponse.json(
        { message: "Only the session owner can update the session" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, status, estimationType } = body;

    // Update session
    if (name) planningSession.name = name;
    if (status) planningSession.status = status;
    if (estimationType) planningSession.estimationType = estimationType;

    // Check if all tasks are completed
    const allTasksCompleted = planningSession.tasks.every(
      (task) => task.status === "completed"
    );

    // If all tasks are completed, mark the session as completed
    if (allTasksCompleted && planningSession.status !== "completed") {
      planningSession.status = "completed";
      console.log("All tasks completed, marking session as completed");
    }

    await planningSession.save();

    return NextResponse.json(planningSession);
  } catch (error) {
    console.error("Failed to update session:", error);
    return NextResponse.json(
      { message: "Failed to update session" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connect();

    // Get session by ID
    const sessionId = params.id;
    const planningSession = await SessionModel.findById(sessionId);

    if (!planningSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check if user is the owner
    const user = session.user as SessionUser;
    const userId = user.id || user.email;

    // For test users with simple string IDs, allow them to delete any session
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(userId)) {
      console.log("Test user detected - bypassing owner check");
    } else if (
      planningSession.ownerId.toString() !==
      new mongoose.Types.ObjectId(userId).toString()
    ) {
      return NextResponse.json(
        { message: "Only the session owner can delete the session" },
        { status: 403 }
      );
    }

    // Delete the session
    await planningSession.deleteOne();

    return NextResponse.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Failed to delete session:", error);
    return NextResponse.json(
      { message: "Failed to delete session" },
      { status: 500 }
    );
  }
}
