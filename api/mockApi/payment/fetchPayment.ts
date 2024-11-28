import { axiosInstance } from "@/api/axiosinstance";
import { END_POINTS } from "@/constants/api";

const fetchPayment = async (tripId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.payment(tripId));
  return data;
};
export default fetchPayment;
