import deleteLocation from "@/api/mockApi/trip/deleteLocation";
import { useMutation } from "@tanstack/react-query";
interface response {
  message: string;
}
const deleteLocationMutation = () => {
  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: (data: response) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default deleteLocationMutation;
