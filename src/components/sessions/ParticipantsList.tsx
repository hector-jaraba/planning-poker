import { useState, useEffect } from "react";

type Participant = {
  userId: string;
  username: string;
  connected: boolean;
  hasEstimated?: boolean;
};

interface ParticipantsListProps {
  socket: any;
  activeTaskId: string | null;
}

export default function ParticipantsList({
  socket,
  activeTaskId,
}: ParticipantsListProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [estimatedUsers, setEstimatedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!socket) return;

    const handleParticipantsUpdate = (data: Participant[]) => {
      console.log("Received participants update:", data);
      setParticipants(data);
    };

    const handleUserEstimated = (data: { userId: string; taskId: string }) => {
      if (data.taskId === activeTaskId) {
        console.log("User estimated:", data.userId);
        setEstimatedUsers((prev) => {
          const newSet = new Set(prev);
          newSet.add(data.userId);
          return newSet;
        });
      }
    };

    const handleEstimatesRevealed = () => {
      // Reset estimated users when estimates are revealed
      setEstimatedUsers(new Set());
    };

    const handleEstimatesHidden = () => {
      // Reset estimated users when estimates are hidden
      setEstimatedUsers(new Set());
    };

    const handleUserJoined = (data: { userId: string }) => {
      console.log("User joined:", data.userId);
    };

    const handleUserLeft = (data: { userId: string }) => {
      console.log("User left:", data.userId);
    };

    const handleSessionUpdate = (data: any) => {
      // If there's an active task, check which users have estimated
      if (activeTaskId && data.tasks) {
        const activeTask = data.tasks.find(
          (t: any) =>
            t.id === activeTaskId ||
            t._id === activeTaskId ||
            t._id.toString() === activeTaskId
        );

        if (activeTask) {
          // Ensure we're working with strings when creating the set
          const estimatedUserIds = new Set(
            activeTask.estimates.map((e: any) => String(e.userId))
          );
          setEstimatedUsers(estimatedUserIds);
        }
      }
    };

    // Register event listeners
    socket.on("participants_update", handleParticipantsUpdate);
    socket.on("user_estimated", handleUserEstimated);
    socket.on("estimates_revealed", handleEstimatesRevealed);
    socket.on("estimates_hidden", handleEstimatesHidden);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);
    socket.on("session_update", handleSessionUpdate);

    // Cleanup
    return () => {
      socket.off("participants_update", handleParticipantsUpdate);
      socket.off("user_estimated", handleUserEstimated);
      socket.off("estimates_revealed", handleEstimatesRevealed);
      socket.off("estimates_hidden", handleEstimatesHidden);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
      socket.off("session_update", handleSessionUpdate);
    };
  }, [socket, activeTaskId]);

  // Reset estimated users when active task changes
  useEffect(() => {
    setEstimatedUsers(new Set());
  }, [activeTaskId]);

  if (participants.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-gray-800 p-4 shadow-md mb-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Participants ({participants.length})
      </h2>
      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.userId}
            className={`flex items-center justify-between rounded-md p-2 ${
              participant.connected ? "bg-gray-700" : "bg-gray-800 opacity-50"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`mr-2 h-3 w-3 rounded-full ${
                  participant.connected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm text-white">{participant.username}</span>
            </div>
            {activeTaskId && (
              <div
                className={`ml-2 h-5 w-5 rounded-full ${
                  estimatedUsers.has(participant.userId)
                    ? "bg-blue-500"
                    : "bg-gray-600"
                }`}
                title={
                  estimatedUsers.has(participant.userId)
                    ? "Has estimated"
                    : "Hasn't estimated yet"
                }
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
