import postSchedule from "@/api/createTrip/postSchedule";
import tripIdState from "@/recoil/tripIdState";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";
interface tripState {
  trip_id: number;
}
interface messageState {
  message: string;
  trip: tripState;
}
const scheduleMutations = () => {
  const router = useRouter();
  const [, setTripId] = useRecoilState(tripIdState);
  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (data: messageState) => {
      console.log(data);
      alert(data.message);
      setTripId(data.trip.trip_id);
      router.push(`/trip/${data.trip.trip_id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export default scheduleMutations;
