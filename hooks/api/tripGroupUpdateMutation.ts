import updateTripGroup from "@/api/trip/updateTripGroup";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface dataState {
  message: string;
}
const tripGroupUpdateMutation = (tripId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTripGroup,
    onSuccess: (data: dataState) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.getTrip, tripId],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default tripGroupUpdateMutation;
