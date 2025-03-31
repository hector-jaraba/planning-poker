import { Server } from "socket.io";
import mongoose from "mongoose";

// SessionModel definition
let SessionModel;

try {
  // Try to get the model if it exists
  SessionModel = mongoose.model("Session");
} catch (e) {
  // Define Session schema if not already defined
  const SessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    participants: [String],
    tasks: [
      {
        title: { type: String, required: true },
        description: String,
        jiraId: String,
        status: {
          type: String,
          enum: ["pending", "active", "completed"],
          default: "pending",
        },
        estimates: [
          {
            userId: String,
            value: mongoose.Schema.Types.Mixed,
          },
        ],
        finalEstimate: mongoose.Schema.Types.Mixed,
      },
    ],
    estimationType: {
      type: String,
      enum: ["fibonacci", "tshirt"],
      default: "fibonacci",
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    shareLink: String,
  });

  // Create the model
  SessionModel = mongoose.model("Session", SessionSchema);
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// Track connected users and sessions
const connectedUsers = new Map();
const sessionRooms = new Map();

// Track participants with their usernames for each session
const sessionParticipants = new Map();

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }

  console.log("Setting up socket.io server...");

  const io = new Server(res.socket.server, {
    path: "/api/socketio",
    addTrailingSlash: false,
  });

  res.socket.server.io = io;

  // Socket.io event handlers
  io.on("connection", async (socket) => {
    const { sessionId, userId, username } = socket.handshake.query;

    if (!sessionId || !userId) {
      socket.disconnect();
      return;
    }

    // Clean and format username for display
    const displayName = username
      ? String(username).trim() || `User ${userId.substring(0, 6)}`
      : `User ${userId.substring(0, 6)}`;

    console.log(
      `User ${displayName} (${userId}) connected to session ${sessionId}`
    );

    // Join the session room
    socket.join(sessionId);

    // Track connected users
    connectedUsers.set(socket.id, {
      userId,
      username: displayName,
      sessionId,
    });

    // Track session participants with usernames
    if (!sessionParticipants.has(sessionId)) {
      sessionParticipants.set(sessionId, new Map());
    }
    sessionParticipants.get(sessionId).set(userId, {
      username: displayName,
      connected: true,
    });

    // Track session participants
    if (!sessionRooms.has(sessionId)) {
      sessionRooms.set(sessionId, new Set());
    }
    sessionRooms.get(sessionId).add(socket.id);

    // Send updated participant list to all users in the session
    const participantsList = Array.from(
      sessionParticipants.get(sessionId).entries()
    ).map(([id, data]) => ({
      userId: id,
      username: data.username,
      connected: data.connected,
    }));

    console.log("Broadcasting participants list:", participantsList);
    io.to(sessionId).emit("participants_update", participantsList);

    // Notify other users in the room
    socket.to(sessionId).emit("user_joined", {
      userId,
      username: displayName,
    });

    // Basic ping/pong for connection testing
    socket.on("ping", (data) => {
      console.log(`Ping received from ${displayName} (${userId}):`, data);
      socket.emit("pong", {
        message: "Server received ping",
        timestamp: Date.now(),
      });
    });

    // Event handlers for session activities
    socket.on("submit_estimate", async (data) => {
      try {
        const { taskId, value } = data;
        console.log("submit_estimate received:", {
          taskId,
          value,
          userId,
          sessionId,
        });

        await connectDB();

        // Find the session
        const session = await SessionModel.findById(sessionId);
        if (!session) {
          console.error("Session not found:", sessionId);
          return;
        }

        // Find the task
        const task = session.tasks.find(
          (t) => t.id === taskId || t._id.toString() === taskId
        );

        if (!task) {
          console.error("Task not found in session:", taskId);
          return;
        }

        console.log("Processing estimate for task:", task.title);

        // Check if user already estimated
        const existingEstimateIndex = task.estimates.findIndex(
          (e) => e.userId.toString() === userId.toString()
        );

        // Value can be null for "?" selections
        const hasActualValue =
          value !== null && value !== undefined && value !== "?";

        if (existingEstimateIndex >= 0) {
          // Update existing estimate
          console.log("Updating existing estimate for user:", userId);
          task.estimates[existingEstimateIndex].value = hasActualValue
            ? value
            : null;
          task.estimates[existingEstimateIndex].hasEstimate = hasActualValue;
        } else {
          // Add new estimate
          console.log("Adding new estimate for user:", userId);
          task.estimates.push({
            userId: userId,
            value: hasActualValue ? value : null,
            hasEstimate: hasActualValue,
          });
        }

        // Ensure task has a revealed property
        if (task.revealed === undefined) {
          task.revealed = false;
        }

        // Save and broadcast update
        await session.save();
        console.log("Session saved with new estimate, emitting update");

        // Create a masked version where estimate values are hidden if not revealed
        const sessionForBroadcast = JSON.parse(JSON.stringify(session));

        // Mask ALL tasks that are not revealed, not just the current one
        sessionForBroadcast.tasks.forEach((t) => {
          // Make sure each task has the revealed property
          if (t.revealed === undefined) {
            t.revealed = false;
          }

          // If this task is not revealed, hide all estimates except the user's own
          if (t.revealed !== true) {
            t.estimates = t.estimates.map((e) => {
              const isCurrentUser = e.userId.toString() === userId.toString();
              const hasValue = e.value !== undefined && e.value !== null;

              return {
                userId: e.userId,
                hasEstimate: hasValue || e.hasEstimate === true,
                // Only show actual value to the user who submitted it, otherwise use "-"
                value:
                  isCurrentUser && hasValue
                    ? e.value
                    : isCurrentUser
                    ? "-"
                    : null,
              };
            });
          }
        });

        console.log("Broadcasting session update with hidden estimates");
        io.to(sessionId).emit("session_update", sessionForBroadcast);

        // Also send an event indicating someone has estimated (without revealing the value)
        io.to(sessionId).emit("user_estimated", {
          userId,
          username: displayName,
          taskId: task._id.toString(),
        });
      } catch (error) {
        console.error("Error submitting estimate:", error);
      }
    });

    // Add a new event handler for revealing estimates
    socket.on("reveal_estimates", async (data) => {
      try {
        const { taskId } = data;

        console.log("reveal_estimates received:", {
          taskId,
          userId,
          sessionId,
          fromAdmin: displayName,
        });

        await connectDB();

        // Find the session
        const session = await SessionModel.findById(sessionId);
        if (!session) {
          console.error("Session not found:", sessionId);
          return;
        }

        // Find the task
        const task = session.tasks.find(
          (t) => t.id === taskId || t._id.toString() === taskId
        );

        if (!task) {
          console.error("Task not found in session:", taskId);
          return;
        }

        // Set revealed flag to true
        task.revealed = true;

        // First, save session with revealed flag
        await session.save();
        console.log("Estimates revealed for task:", task.title);

        // Extract and prepare the actual estimate values from the task
        const cleanEstimates = task.estimates.map((est) => ({
          userId: est.userId ? est.userId.toString() : est.userId,
          value: est.value, // Include the actual estimate value
          hasEstimate: est.value !== undefined && est.value !== null,
        }));

        console.log("Sending revealed estimates:", cleanEstimates);

        // First send the reveal event with full estimate data
        io.to(sessionId).emit("estimates_revealed", {
          taskId: task._id.toString(),
          estimates: cleanEstimates,
        });

        // Then send full session update with all estimate values visible
        const fullSessionCopy = JSON.parse(JSON.stringify(session));

        // Make sure all estimates have proper values in all tasks
        fullSessionCopy.tasks.forEach((t) => {
          // Initialize revealed property if missing
          if (t.revealed === undefined) {
            t.revealed = t._id.toString() === taskId;
          }

          // For the revealed task, make sure all estimate data is complete
          if (t._id.toString() === taskId) {
            t.estimates = t.estimates.map((est) => ({
              userId: est.userId,
              value: est.value,
              hasEstimate: est.value !== undefined && est.value !== null,
            }));
          }
        });

        // Send the complete session data
        io.to(sessionId).emit("session_update", fullSessionCopy);
      } catch (error) {
        console.error("Error revealing estimates:", error);
      }
    });

    // Add a new event handler for hiding estimates
    socket.on("hide_estimates", async (data) => {
      try {
        const { taskId } = data;

        console.log("hide_estimates received:", {
          taskId,
          userId,
          sessionId,
          fromAdmin: displayName,
        });

        await connectDB();

        // Find the session
        const session = await SessionModel.findById(sessionId);
        if (!session) {
          console.error("Session not found:", sessionId);
          return;
        }

        // Find the task
        const task = session.tasks.find(
          (t) => t.id === taskId || t._id.toString() === taskId
        );

        if (!task) {
          console.error("Task not found in session:", taskId);
          return;
        }

        // Set revealed flag to false
        task.revealed = false;

        // Save and broadcast update
        await session.save();
        console.log("Estimates hidden for task:", task.title);

        // Broadcast the hide event first
        io.to(sessionId).emit("estimates_hidden", {
          taskId: task._id.toString(),
        });

        // Create a masked version
        const sessionForBroadcast = JSON.parse(JSON.stringify(session));
        sessionForBroadcast.tasks.forEach((t) => {
          // Make sure each task has the revealed property
          if (t.revealed === undefined) {
            t.revealed = false;
          }

          // If this task is not revealed, hide all estimates except the user's own
          if (t.revealed !== true) {
            t.estimates = t.estimates.map((e) => ({
              userId: e.userId,
              hasEstimate: e.value !== undefined && e.value !== null,
              // Only show actual value to the user who submitted it
              value: e.userId.toString() === userId.toString() ? e.value : null,
            }));
          }
        });

        // Then send masked session update
        io.to(sessionId).emit("session_update", sessionForBroadcast);
      } catch (error) {
        console.error("Error hiding estimates:", error);
      }
    });

    socket.on("set_active_task", async (data) => {
      try {
        // Immediately acknowledge receipt
        socket.emit("set_active_task_received", { taskId: data?.taskId });

        const { taskId } = data || {};

        if (!taskId) {
          console.error("Invalid taskId received:", data);
          socket.emit("set_active_task_error", { error: "Invalid task ID" });
          return;
        }

        console.log("set_active_task received:", {
          taskId,
          userId,
          sessionId,
          taskIdType: typeof taskId,
        });

        await connectDB();

        // Find the session
        const session = await SessionModel.findById(sessionId);
        if (!session) {
          console.error("Session not found:", sessionId);
          socket.emit("set_active_task_error", { error: "Session not found" });
          return;
        }

        console.log(
          "Session tasks:",
          session.tasks.map((t) => ({
            id: t.id,
            _id: t._id?.toString(),
            title: t.title,
            status: t.status,
          }))
        );

        // Update task status
        let taskFound = false;

        // First pass: Find the task to make active and remember current status of all tasks
        const taskStatusMap = new Map();
        session.tasks.forEach((task) => {
          const taskIdStr = task._id.toString();
          taskStatusMap.set(taskIdStr, task.status);
        });

        // Second pass: Update statuses
        session.tasks.forEach((task) => {
          // Try different ways to match the task ID
          const taskIdStr = task._id.toString();
          const taskIdMatches =
            task.id === taskId ||
            taskIdStr === taskId ||
            task._id.toString() === taskId;

          if (taskIdMatches) {
            console.log("Setting task as active:", {
              title: task.title,
              id: task.id,
              _id: task._id.toString(),
              previousStatus: task.status,
            });
            task.status = "active";
            taskFound = true;
          } else if (task.status === "active") {
            console.log("Changing previously active task status:", task.title);
            // If task was previously completed, keep it completed
            if (taskStatusMap.get(taskIdStr) === "completed") {
              task.status = "completed";
            } else if (
              task.finalEstimate ||
              (task.estimates && task.estimates.length > 0)
            ) {
              // Only mark as completed if it has a final estimate or any estimates
              console.log(
                `Task "${task.title}" has estimates, marking as completed`
              );
              task.status = "completed";
            } else {
              // No estimates yet, return to pending state
              console.log(
                `Task "${task.title}" has no estimates, returning to pending`
              );
              task.status = "pending";
            }
          } else {
            // Keep other tasks as they are (pending or completed)
            // This ensures completed tasks stay completed
            console.log(`Keeping task "${task.title}" as ${task.status}`);
          }
        });

        if (!taskFound) {
          console.error("No matching task found:", taskId);
          socket.emit("set_active_task_error", { error: "Task not found" });
          return;
        }

        // Save updated session
        await session.save();

        // Send success response
        socket.emit("set_active_task_success", {
          taskId,
          message: "Task set as active successfully",
        });

        // Broadcast session update to all users
        io.to(sessionId).emit("session_update", session);

        console.log("Task set as active, session updated");
      } catch (error) {
        console.error("Error setting active task:", error);
        socket.emit("set_active_task_error", {
          error: "Server error processing request",
        });
      }
    });

    socket.on("add_task", async (data) => {
      // First acknowledge receipt to keep the socket open
      socket.emit("add_task_received", {
        status: "received",
        message: "Task request received by server",
        taskData: data,
      });

      try {
        const { title, description, jiraId } = data;
        console.log("add_task received from:", displayName, "(", userId, ")", {
          title,
          description,
          jiraId,
          sessionId,
        });

        // Double-check connection
        if (!socket.connected) {
          console.error("Socket disconnected during task creation");
          return;
        }

        try {
          await connectDB();

          // Find the session
          const session = await SessionModel.findById(sessionId);
          if (!session) {
            console.error("Session not found:", sessionId);
            if (socket.connected) {
              socket.emit("add_task_error", { error: "Session not found" });
            }
            return;
          }

          // Create new task with proper MongoDB document structure
          const newTask = {
            title,
            description: description || "",
            jiraId: jiraId || undefined,
            status: "pending",
            estimates: [],
          };

          // Add task to session
          session.tasks.push(newTask);
          const newTaskId = session.tasks[session.tasks.length - 1]._id;
          console.log("Task added:", {
            title: newTask.title,
            taskId: newTaskId,
          });

          // Save session in a separate try block
          try {
            await session.save();
            console.log("Session saved with new task, emitting response");

            // Check if socket is still connected
            if (socket.connected) {
              // First send a success confirmation to the task creator
              socket.emit("add_task_success", {
                taskId: newTaskId.toString(),
                message: "Task created successfully",
              });

              // Then broadcast to all users in the room
              io.to(sessionId).emit("session_update", session);
              console.log("Session update emitted to room", sessionId);
            } else {
              console.warn(
                "Socket disconnected before sending success response"
              );
            }
          } catch (saveError) {
            console.error("Error saving session:", saveError);
            if (socket.connected) {
              socket.emit("add_task_error", { error: "Failed to save task" });
            }
          }
        } catch (dbError) {
          console.error("Database error:", dbError);
          if (socket.connected) {
            socket.emit("add_task_error", { error: "Database error" });
          }
        }
      } catch (error) {
        console.error("Error adding task:", error);
        if (socket.connected) {
          socket.emit("add_task_error", {
            error: "Server error processing task",
          });
        }
      }
    });

    socket.on("refresh_session", async () => {
      try {
        await connectDB();

        // Find the session
        const session = await SessionModel.findById(sessionId);
        if (!session) return;

        // Create a proper copy of the session with consistent formatting
        const processedSession = JSON.parse(JSON.stringify(session));

        // Ensure all tasks have proper revealed state and estimate formatting
        processedSession.tasks.forEach((task) => {
          // Initialize revealed if missing
          if (task.revealed === undefined) {
            task.revealed = false;
          }

          // For non-revealed tasks, mask estimates except for the current user
          if (task.revealed !== true) {
            task.estimates = task.estimates.map((est) => {
              const isCurrentUser =
                est.userId && est.userId.toString() === userId.toString();
              const hasValue = est.value !== undefined && est.value !== null;

              return {
                userId: est.userId,
                hasEstimate: hasValue || est.hasEstimate === true,
                // Only show actual value to current user
                value:
                  isCurrentUser && hasValue
                    ? est.value
                    : isCurrentUser
                    ? "-"
                    : null,
              };
            });
          } else {
            // For revealed tasks, ensure all estimates have consistent structure
            task.estimates = task.estimates.map((est) => ({
              userId: est.userId,
              value: est.value,
              hasEstimate: est.value !== undefined && est.value !== null,
            }));
          }
        });

        // Broadcast the processed session update
        io.to(sessionId).emit("session_update", processedSession);
      } catch (error) {
        console.error("Error refreshing session:", error);
      }
    });

    socket.on("set_final_estimate", async (data) => {
      try {
        const { taskId, estimate } = data;

        console.log("set_final_estimate received:", {
          taskId,
          estimate,
          userId,
          sessionId,
          fromAdmin: displayName,
        });

        await connectDB();

        // Find the session
        const session = await SessionModel.findById(sessionId);
        if (!session) {
          console.error("Session not found:", sessionId);
          return;
        }

        // Find the task
        const task = session.tasks.find(
          (t) => t.id === taskId || t._id.toString() === taskId
        );

        if (!task) {
          console.error("Task not found in session:", taskId);
          return;
        }

        // Set final estimate and mark task as completed
        task.finalEstimate = estimate;
        task.status = "completed";
        task.revealed = true; // Make sure estimates are revealed with final estimate

        // Save and broadcast update
        await session.save();
        console.log("Final estimate set for task:", task.title, "=", estimate);

        // Broadcast task completed event
        io.to(sessionId).emit("task_completed", {
          taskId: task._id.toString(),
          finalEstimate: estimate,
        });

        // Send full session update
        io.to(sessionId).emit("session_update", session);
      } catch (error) {
        console.error("Error setting final estimate:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const userData = connectedUsers.get(socket.id);
      if (userData) {
        console.log(
          `User ${userData.username} disconnected from session ${userData.sessionId}`
        );

        // Remove from connected users
        connectedUsers.delete(socket.id);

        // Update session participants
        if (
          sessionParticipants.has(userData.sessionId) &&
          sessionParticipants.get(userData.sessionId).has(userData.userId)
        ) {
          sessionParticipants
            .get(userData.sessionId)
            .get(userData.userId).connected = false;

          // Send updated participant list
          const participantsList = Array.from(
            sessionParticipants.get(userData.sessionId).entries()
          ).map(([id, data]) => ({
            userId: id,
            username: data.username,
            connected: data.connected,
          }));

          io.to(userData.sessionId).emit(
            "participants_update",
            participantsList
          );
        }

        // Remove from session room
        if (sessionRooms.has(userData.sessionId)) {
          sessionRooms.get(userData.sessionId).delete(socket.id);

          // If room is empty, cleanup
          if (sessionRooms.get(userData.sessionId).size === 0) {
            sessionRooms.delete(userData.sessionId);
            sessionParticipants.delete(userData.sessionId);
          }
        }

        // Notify other users in the room
        socket.to(userData.sessionId).emit("user_left", {
          userId: userData.userId,
          username: userData.username,
        });
      }
    });
  });

  res.end();
}
