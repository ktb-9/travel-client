import deleteLocation from "@/api/trip/deleteLocation";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Response {
  message: string;
}

const deleteLocationMutation = (tripId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: (data: Response) => {
      alert(data.message);
      if (tripId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getTrip, tripId],
        });
      }
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};

export default deleteLocationMutation;
