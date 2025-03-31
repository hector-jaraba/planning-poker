"use client";

interface Task {
  id?: string;
  _id?: string;
  title: string;
  status: "pending" | "active" | "completed";
  finalEstimate?: string | number;
}

interface TaskListProps {
  tasks: Task[];
  activeTaskId?: string;
  setActiveTask: (taskId: string) => void;
  isAdmin: boolean;
}

export default function TaskList({
  tasks,
  activeTaskId,
  setActiveTask,
  isAdmin,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-400">No tasks available.</p>;
  }

  // Debug all tasks
  console.log(
    "All tasks in TaskList:",
    tasks.map((t) => ({ id: t.id || t._id, title: t.title }))
  );

  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        // Make sure we have a valid task ID (either id or _id)
        const taskId = task.id || task._id;
        if (!task || !taskId) {
          console.error("Task missing ID:", task);
          return null;
        }

        console.log("Rendering task:", {
          id: taskId,
          title: task.title,
          status: task.status,
        });

        return (
          <div
            key={taskId}
            className={`cursor-pointer rounded-md p-3 ${
              taskId === activeTaskId
                ? "bg-blue-900 text-white"
                : task.status === "completed"
                ? "bg-green-900/30 text-gray-200"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
            data-taskid={taskId}
            onClick={() => {
              // Use task ID directly without relying on dataset
              console.log("Task clicked with ID:", taskId);

              if (taskId) {
                setActiveTask(taskId);
              } else {
                console.error("Cannot set task as active: No task ID found");
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{task.title}</span>
              {task.finalEstimate && (
                <span className="rounded-full bg-green-800 px-2 py-1 text-xs">
                  {task.finalEstimate}
                </span>
              )}
            </div>
            <div className="mt-1 text-xs">
              <span
                className={`rounded px-1.5 py-0.5 ${
                  task.status === "active"
                    ? "bg-blue-700"
                    : task.status === "completed"
                    ? "bg-green-700"
                    : "bg-gray-600"
                }`}
              >
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
