import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "@/recoil/groupMemberState";
import { AXIOS_BASE_URL } from "@/constants/api";

export const useGroupSocket = (groupId: number, userId: number) => {
  const [members, setMembers] = useRecoilState(groupMembersState);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(AXIOS_BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    const socket = socketRef.current;

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      socket.emit("joinGroup", { groupId, userId });
      socket.emit("getMembers", { groupId });
    };

    const handleMembersList = (data: any) => {
      console.log("Received members list:", data);
      setMembers(data.members);
    };

    const handleMemberJoined = (data: any) => {
      console.log("New member joined:", data);
      const newMember = data.newMember;
      setMembers((prev) => [
        ...prev,
        {
          user_id: newMember.user_id,
          nickname: newMember.nickname,
          profileImage: newMember.profileImage,
          role: "COMPANION",
        },
      ]);
    };

    const handleMemberLeft = (data: any) => {
      setMembers((prev) =>
        prev.filter((member) => member.user_id !== data.userId)
      );
    };

    const handleError = (error: any) => {
      console.error("Socket error:", error);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    };

    socket.on("connect", handleConnect);
    socket.on("membersList", handleMembersList);
    socket.on("memberJoined", handleMemberJoined);
    socket.on("memberLeft", handleMemberLeft);
    socket.on("error", handleError);
    socket.on("disconnect", handleDisconnect);

    return () => {
      if (socket) {
        socket.off("connect", handleConnect);
        socket.off("membersList", handleMembersList);
        socket.off("memberJoined", handleMemberJoined);
        socket.off("memberLeft", handleMemberLeft);
        socket.off("error", handleError);
        socket.off("disconnect", handleDisconnect);
        socket.disconnect();
      }
    };
  }, [groupId, userId]);

  return {
    socket: socketRef.current,
    members,
  };
};
