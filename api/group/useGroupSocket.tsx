import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRecoilState } from "recoil";

import { groupMembersState } from "@/recoil/groupMemberState";
import { AXIOS_BASE_URL } from "@/constants/api";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export const useGroupSocket = (groupId: number, userId: number) => {
  const [members, setMembers] = useRecoilState(groupMembersState);
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();
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
      console.log("Member Left Event Received:", data);
      setMembers((prev) => {
        const newMembers = prev.filter(
          (member) => member.user_id !== data.userId
        );
        console.log("Updated Members:", newMembers);
        return newMembers;
      });
    };

    const handleGroupDeleted = (data: any) => {
      console.log("Group Deleted Event Received:", data);

      Alert.alert(
        "알림",
        data.message,
        [
          {
            text: "확인",
            onPress: () => {
              router.push(`/myTripList/myTripList`);
            },
          },
        ],
        { cancelable: false }
      );
    };
    const handleError = (error: any) => {
      console.error("Socket error:", error);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
    };

    socket.on("connect", handleConnect);
    socket.on("membersList", handleMembersList);
    socket.on("memberJoined", handleMemberJoined);
    socket.on("memberLeft", handleMemberLeft);
    socket.on("groupDeleted", handleGroupDeleted);
    socket.on("error", handleError);
    socket.on("disconnect", handleDisconnect);

    return () => {
      if (socket) {
        socket.off("connect", handleConnect);
        socket.off("membersList", handleMembersList);
        socket.off("memberJoined", handleMemberJoined);
        socket.off("memberLeft", handleMemberLeft);
        socket.off("groupDeleted", handleGroupDeleted);
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
