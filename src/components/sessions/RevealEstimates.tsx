import { useState, useEffect } from "react";

interface RevealEstimatesProps {
  socket: any;
  activeTaskId: string | null;
  isAdmin: boolean;
  activeTask?: any; // Add activeTask prop to check for completion status
}

export default function RevealEstimates({
  socket,
  activeTaskId,
  isAdmin,
  activeTask,
}: RevealEstimatesProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!socket || !activeTaskId) return;

    // Reset revealed state when active task changes
    setIsRevealed(false);

    // Check if task is completed based on activeTask prop
    if (activeTask) {
      setIsCompleted(
        activeTask.status === "completed" ||
          activeTask.finalEstimate !== undefined
      );
    } else {
      setIsCompleted(false);
    }

    const handleSessionUpdate = (data: any) => {
      if (!activeTaskId || !data.tasks) return;

      const activeTask = data.tasks.find(
        (t: any) =>
          t.id === activeTaskId ||
          t._id === activeTaskId ||
          t._id.toString() === activeTaskId
      );

      if (activeTask) {
        setIsRevealed(!!activeTask.revealed);
        setIsCompleted(
          activeTask.status === "completed" ||
            activeTask.finalEstimate !== undefined
        );
      }
    };

    const handleEstimatesRevealed = (data: any) => {
      if (data.taskId === activeTaskId) {
        setIsRevealed(true);
        setIsLoading(false);
      }
    };

    const handleEstimatesHidden = (data: any) => {
      if (data.taskId === activeTaskId) {
        setIsRevealed(false);
        setIsLoading(false);
      }
    };

    const handleTaskCompleted = (data: any) => {
      if (data.taskId === activeTaskId) {
        setIsCompleted(true);
        setIsRevealed(true); // Task completion reveals estimates
      }
    };

    socket.on("session_update", handleSessionUpdate);
    socket.on("estimates_revealed", handleEstimatesRevealed);
    socket.on("estimates_hidden", handleEstimatesHidden);
    socket.on("task_completed", handleTaskCompleted);

    return () => {
      socket.off("session_update", handleSessionUpdate);
      socket.off("estimates_revealed", handleEstimatesRevealed);
      socket.off("estimates_hidden", handleEstimatesHidden);
      socket.off("task_completed", handleTaskCompleted);
    };
  }, [socket, activeTaskId, activeTask]);

  const handleRevealEstimates = () => {
    if (!socket || !activeTaskId || !isAdmin || isLoading || isCompleted)
      return;

    setIsLoading(true);
    console.log(
      `${
        isRevealed ? "Hiding" : "Revealing"
      } estimates for task ${activeTaskId}`
    );

    const eventName = isRevealed ? "hide_estimates" : "reveal_estimates";
    socket.emit(eventName, { taskId: activeTaskId });
  };

  if (!isAdmin || !activeTaskId) return null;

  // Don't show button if task is completed
  if (isCompleted) {
    return (
      <div className="mt-4 p-2 text-sm text-center rounded-md bg-lime-900 text-white">
        Task completed with final estimate
      </div>
    );
  }

  return (
    <button
      onClick={handleRevealEstimates}
      disabled={isLoading || isCompleted}
      className={`mt-4 w-full rounded-md px-4 py-2 font-medium text-white transition-colors ${
        isLoading || isCompleted
          ? "bg-gray-600 cursor-not-allowed"
          : isRevealed
          ? "bg-red-700 hover:bg-red-600"
          : "bg-lime-700 hover:bg-lime-500"
      }`}
    >
      {isLoading
        ? "Processing..."
        : isRevealed
        ? "Hide Estimates"
        : "Reveal Estimates"}
    </button>
  );
}
