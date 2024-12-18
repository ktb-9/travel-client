import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchPaymentMembers = async (tripId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.GETPAYMENTMEMBER(tripId));
  return data;
};
export default fetchPaymentMembers;
