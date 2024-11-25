import updateTrip from "@/api/trip/updateTrip";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const tripUpdateMutation = () => {
  const queryClient = useQueryClient();
  interface response {
    message: string;
  }
  return useMutation({
    mutationFn: updateTrip,
    onSuccess: (data: response) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: queryKeys.getTrip,
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default tripUpdateMutation;
