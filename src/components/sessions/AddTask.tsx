"use client";

import { useState, useEffect } from "react";

interface AddTaskProps {
  sessionId: string;
  socket: any;
}

export default function AddTask({ sessionId, socket }: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [jiraId, setJiraId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskStatus, setTaskStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    const onAddTaskReceived = (data: any) => {
      console.log("Server acknowledged task receipt:", data);
    };

    const onAddTaskSuccess = (data: any) => {
      console.log("Task added successfully:", data);
      setTaskStatus("success");
      setIsSubmitting(false);

      // Reset form
      setTaskTitle("");
      setTaskDescription("");
      setJiraId("");
      setIsAdding(false);
    };

    const onAddTaskError = (data: any) => {
      console.error("Error adding task:", data.error);
      setErrorMessage(data.error || "Failed to add task");
      setTaskStatus("error");
      setIsSubmitting(false);
    };

    // Register event listeners
    socket.on("add_task_received", onAddTaskReceived);
    socket.on("add_task_success", onAddTaskSuccess);
    socket.on("add_task_error", onAddTaskError);

    // Cleanup function
    return () => {
      socket.off("add_task_received", onAddTaskReceived);
      socket.off("add_task_success", onAddTaskSuccess);
      socket.off("add_task_error", onAddTaskError);
    };
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    setIsSubmitting(true);
    setTaskStatus("submitting");
    setErrorMessage("");

    console.log("Attempting to add task:", { sessionId, socket: !!socket });

    if (socket) {
      // Check if socket is connected first
      if (!socket.connected) {
        console.error("Socket is disconnected, attempting to reconnect...");
        setErrorMessage("Socket disconnected. Attempting to reconnect...");

        // Try to reconnect
        socket.connect();

        // If reconnected, proceed, otherwise show error
        socket.once("connect", () => {
          console.log("Socket reconnected, retrying submission");
          setErrorMessage("");
          // Recursively call handleSubmit to try again
          handleSubmit(e);
        });

        // Set timeout for reconnection attempt
        setTimeout(() => {
          if (!socket.connected) {
            setErrorMessage(
              "Could not reconnect to server. Please try again later."
            );
            setTaskStatus("error");
            setIsSubmitting(false);
          }
        }, 5000);

        return;
      }

      const taskData = {
        title: taskTitle,
        description: taskDescription,
        jiraId: jiraId || undefined,
      };

      console.log("Emitting add_task event with data:", taskData);

      // Create a ref to track if the timeout fired
      let timeoutFired = false;

      // Set a longer timeout for server response
      const timeout = setTimeout(() => {
        timeoutFired = true;
        setErrorMessage(
          "Server response timeout - the task may have been created but the response was slow. Please check before creating another task."
        );
        setTaskStatus("error");
        setIsSubmitting(false);
      }, 10000);

      try {
        socket.emit("add_task", taskData);

        // Listen for disconnect during task creation
        const disconnectHandler = (reason: string) => {
          console.error("Socket disconnected during task creation:", reason);
          if (!timeoutFired) {
            clearTimeout(timeout);
            setErrorMessage(
              `Connection lost while creating task: ${reason}. The task may still have been created.`
            );
            setTaskStatus("error");
            setIsSubmitting(false);
          }
        };

        socket.once("disconnect", disconnectHandler);

        // Clean up the disconnect handler after task completion or timeout
        socket.once("add_task_success", () => {
          socket.off("disconnect", disconnectHandler);
        });

        socket.once("add_task_error", () => {
          socket.off("disconnect", disconnectHandler);
        });
      } catch (err) {
        console.error("Error emitting add_task event:", err);
        setErrorMessage("Failed to send task to server");
        setTaskStatus("error");
        setIsSubmitting(false);
        clearTimeout(timeout);
      }
    } else {
      console.error("Socket not available for adding task");
      setErrorMessage("Socket connection not available");
      setTaskStatus("error");
      setIsSubmitting(false);
    }
  };

  if (!isAdding) {
    return (
      <div className="mt-4 border-t border-gray-700 pt-4">
        <button
          onClick={() => {
            setIsAdding(true);
            setTaskStatus("idle");
            setErrorMessage("");
          }}
          className="w-full rounded-md bg-primary-800 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-700"
        >
          Add New Task
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 border-t border-gray-700 pt-4"
    >
      <div className="mb-3">
        <label
          htmlFor="taskTitle"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="taskDescription"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Description (Optional)
        </label>
        <textarea
          id="taskDescription"
          className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          rows={2}
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="jiraId"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          JIRA ID (Optional)
        </label>
        <input
          type="text"
          id="jiraId"
          className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={jiraId}
          onChange={(e) => setJiraId(e.target.value)}
          placeholder="e.g. PROJ-123"
          disabled={isSubmitting}
        />
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-md bg-red-900 p-2 text-sm text-white">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className={`flex-1 rounded-md ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-primary-700 hover:bg-primary-600"
          } py-2 text-sm font-medium text-white`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="rounded-md bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
