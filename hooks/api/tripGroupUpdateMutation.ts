import updateTripGroup from "@/api/mockApi/trip/updateTripGroup";
import { useMutation } from "@tanstack/react-query";
interface dataState {
  message: string;
}
const tripGroupUpdateMutation = () => {
  return useMutation({
    mutationFn: updateTripGroup,
    onSuccess: (data: dataState) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default tripGroupUpdateMutation;
