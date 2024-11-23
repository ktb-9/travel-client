import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchMyTripGroup = async () => {
  const { data } = await axiosInstance.get(END_POINTS.MYTRIP);
  return data;
};
export default fetchMyTripGroup;
