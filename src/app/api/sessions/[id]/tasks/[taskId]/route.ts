import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SessionModel from "@/models/Session";
import { connect } from "@/lib/db";
import mongoose from "mongoose";

interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; taskId: string } }
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
    const taskId = params.taskId;
    const planningSession = await SessionModel.findById(sessionId);

    if (!planningSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Find the task in the session
    const taskIndex = planningSession.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Parse request body
    const body = await request.json();
    const { status, finalEstimate } = body;

    // Update task
    if (status) {
      planningSession.tasks[taskIndex].status = status;
    }
    if (finalEstimate !== undefined) {
      planningSession.tasks[taskIndex].finalEstimate = finalEstimate;
    }

    // Check if all tasks are completed
    const allTasksCompleted = planningSession.tasks.every(
      (task) => task.status === "completed"
    );

    // If all tasks are completed, mark the session as completed
    if (allTasksCompleted) {
      planningSession.status = "completed";
      console.log("All tasks completed, marking session as completed");
    }

    // Save the updated session
    await planningSession.save();

    // Return the updated task
    return NextResponse.json(planningSession.tasks[taskIndex]);
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}
