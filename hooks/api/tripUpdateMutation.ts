import updateTrip from "@/api/mockApi/trip/updateTrip";
import { useMutation } from "@tanstack/react-query";

const tripUpdateMutation = () => {
  interface response {
    message: string;
  }
  return useMutation({
    mutationFn: updateTrip,
    onSuccess: (data: response) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default tripUpdateMutation;
