import postTrip from "@/api/trip/postTrip";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface response {
  message: string;
}
const addTripMutation = (tripId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTrip,
    onSuccess: (data: response) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getTrip, tripId],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default addTripMutation;
