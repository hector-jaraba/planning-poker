import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ShieldCheckIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

type Participant = {
  userId: string;
  username: string;
  connected: boolean;
  hasEstimated?: boolean;
};

interface ParticipantsListProps {
  socket: any;
  activeTaskId: string | null;
  sessionData: any;
  isAdmin: boolean;
}

// Define session user type
interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
}

export default function ParticipantsList({
  socket,
  activeTaskId,
  sessionData,
  isAdmin,
}: ParticipantsListProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [estimatedUsers, setEstimatedUsers] = useState<Set<string>>(new Set());
  const { data: session } = useSession();

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
      setEstimatedUsers(new Set<string>());
    };

    const handleEstimatesHidden = () => {
      // Reset estimated users when estimates are hidden
      setEstimatedUsers(new Set<string>());
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
          const estimatedUserIds = new Set<string>(
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
    setEstimatedUsers(new Set<string>());
  }, [activeTaskId]);

  const handleMakeAdmin = (userId: string) => {
    if (!socket || !sessionData?._id) return;

    socket.emit("make_admin", {
      targetUserId: userId,
    });
  };

  const handleRemoveAdmin = (userId: string) => {
    if (!socket || !sessionData?._id) return;

    socket.emit("remove_admin", {
      targetUserId: userId,
    });
  };

  if (participants.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-gray-800 p-4 shadow-md mb-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Participants ({participants.length})
      </h2>
      <div className="space-y-2">
        {participants.map((participant) => {
          const user = session?.user as SessionUser;
          const currentUserId = user?.id || user?.email;
          const isParticipantAdmin = sessionData?.admins?.includes(
            participant.userId
          );
          const isOwner = sessionData?.ownerId === participant.userId;
          const canManageAdmins =
            isAdmin && currentUserId !== participant.userId && !isOwner;

          return (
            <div
              key={participant.userId}
              className={`flex items-center justify-between rounded-md p-2 ${
                participant.connected ? "bg-gray-700" : "bg-gray-800 opacity-50"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-2 h-3 w-3 rounded-full ${
                    participant.connected ? "bg-lime-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm text-white">
                  {participant.username}
                </span>
                {isOwner && (
                  <span className="ml-2 text-xs bg-gray-600 text-white px-2 py-0.5 rounded">
                    Owner
                  </span>
                )}
                {isParticipantAdmin && !isOwner && (
                  <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </div>
              <div className="flex items-center">
                {canManageAdmins && (
                  <button
                    onClick={() =>
                      isParticipantAdmin
                        ? handleRemoveAdmin(participant.userId)
                        : handleMakeAdmin(participant.userId)
                    }
                    className={`mr-2 p-1.5 text-xs rounded ${
                      isParticipantAdmin
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    title={isParticipantAdmin ? "Remove Admin" : "Make Admin"}
                  >
                    {isParticipantAdmin ? (
                      <NoSymbolIcon className="h-4 w-4" />
                    ) : (
                      <ShieldCheckIcon className="h-4 w-4" />
                    )}
                  </button>
                )}
                {activeTaskId && (
                  <div
                    className={`mr-2 h-5 w-5 rounded-full ${
                      estimatedUsers.has(participant.userId)
                        ? "bg-primary-500"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
