import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchTrip = async (tripId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.trip(tripId));
  return data;
};
export default fetchTrip;
