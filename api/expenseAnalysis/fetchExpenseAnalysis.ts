import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchExpenseAnalysis = async (tripId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.GETANALYSIS(tripId));
  return data;
};
export default fetchExpenseAnalysis;
