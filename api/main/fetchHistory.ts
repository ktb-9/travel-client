import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchHistory = async () => {
  const { data } = await axiosInstance.get(END_POINTS.HISTORY);
  return data;
};
export default fetchHistory;
