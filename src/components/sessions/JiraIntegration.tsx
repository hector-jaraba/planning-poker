"use client";

import { useState } from "react";

interface JiraIntegrationProps {
  sessionId: string;
  socket: any;
}

export default function JiraIntegration({
  sessionId,
  socket,
}: JiraIntegrationProps) {
  const [jiraProjectKey, setJiraProjectKey] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState("");

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jiraProjectKey.trim()) {
      setError("Project key is required");
      return;
    }

    setIsImporting(true);
    setError("");

    try {
      // This would normally call the backend API to import from JIRA
      // For the MVP, we'll simulate with a basic implementation
      const response = await fetch("/api/jira/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          projectKey: jiraProjectKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to import from JIRA");
      }

      // Notify success
      setJiraProjectKey("");

      // In a real app, we'd emit an event to update the tasks in real-time
      if (socket) {
        socket.emit("refresh_session", { sessionId });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-3 rounded-md bg-red-800/50 p-2 text-sm text-white">
          {error}
        </div>
      )}

      <form onSubmit={handleImport}>
        <div className="mb-3">
          <label
            htmlFor="jiraProjectKey"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            JIRA Project Key
          </label>
          <input
            type="text"
            id="jiraProjectKey"
            className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jiraProjectKey}
            onChange={(e) => setJiraProjectKey(e.target.value)}
            placeholder="e.g. PROJ"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full rounded-md bg-blue-700 py-2 text-sm font-medium text-white hover:bg-blue-600 ${
            isImporting ? "opacity-70" : ""
          }`}
          disabled={isImporting}
        >
          {isImporting ? "Importing..." : "Import Tasks from JIRA"}
        </button>
      </form>

      <p className="mt-2 text-xs text-gray-400">
        This will import open issues from the specified JIRA project.
      </p>
    </div>
  );
}
