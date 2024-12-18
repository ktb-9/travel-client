import postSchedule from "@/api/createTrip/postSchedule";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

interface TripState {
  trip_id: number;
}

interface MessageState {
  message: string;
  trip: TripState;
}

const scheduleMutations = (groupId: number, socket: Socket | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (data: MessageState) => {
      // 브로디 캐스팅 전체에게 전달
      if (socket && socket.connected) {
        socket.emit("tripCreated", {
          groupId: groupId,
          tripId: data.trip.trip_id,
        });
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.getPrevious,
      });
    },
    onError: (error) => {
      console.error(error);
      alert("일정 생성 중 오류가 발생했습니다.");
    },
  });
};

export default scheduleMutations;
