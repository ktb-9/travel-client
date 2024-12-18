import updateTrip from "@/api/trip/updateTrip";
import { queryKeys } from "@/constants/querykeys";
import tripIdState from "@/recoil/tripIdState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const tripUpdateMutation = () => {
  const tripId = useRecoilValue(tripIdState);
  const queryClient = useQueryClient();
  interface response {
    message: string;
  }
  return useMutation({
    mutationFn: updateTrip,
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
export default tripUpdateMutation;
