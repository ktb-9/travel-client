import postSchedule from "@/api/mockApi/createTrip/postSchedule";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
interface messageState {
  message: string;
}
const scheduleMutations = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (data: messageState) => {
      console.log(data);
      alert(data.message);
      router.push("/viewTrip/viewTrip");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export default scheduleMutations;
