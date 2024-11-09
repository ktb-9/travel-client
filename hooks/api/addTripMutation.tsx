import postTrip from "@/api/mockApi/trip/postTrip";
import { useMutation } from "@tanstack/react-query";
interface response {
  message: string;
}
const addTripMutation = () => {
  return useMutation({
    mutationFn: postTrip,
    onSuccess: (data: response) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default addTripMutation;
