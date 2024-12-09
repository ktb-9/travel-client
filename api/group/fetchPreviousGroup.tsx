import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchPreviousGroup = async () => {
  const { data } = await axiosInstance.get(END_POINTS.GETPREVIOUSGROUP);
  return data;
};
export default fetchPreviousGroup;
