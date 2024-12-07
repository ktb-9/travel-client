import postSchedule from "@/api/createTrip/postSchedule";
import { useMutation } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

interface TripState {
  trip_id: number;
}

interface MessageState {
  message: string;
  trip: TripState;
}

const scheduleMutations = (groupId: number, socket: Socket | undefined) => {
  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (data: MessageState) => {
      // Broadcast trip creation to all group members
      if (socket && socket.connected) {
        socket.emit("tripCreated", {
          groupId: groupId,
          tripId: data.trip.trip_id,
        });
      }
    },
    onError: (error) => {
      console.error(error);
      alert("일정 생성 중 오류가 발생했습니다.");
    },
  });
};

export default scheduleMutations;
