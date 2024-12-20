import postLeaveGroup from "@/api/LeaveGroup/postLeaveGroup";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const leaveGroupMutation = (tripId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => postLeaveGroup(tripId),
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getPaymentMember, tripId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getTrip, tripId],
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getMyTrip,
      });
      router.push("/myTripList/myTripList");
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default leaveGroupMutation;
