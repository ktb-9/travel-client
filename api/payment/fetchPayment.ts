import { END_POINTS } from "@/constants/api";
import axios from "axios";
import { axiosInstance } from "../axiosinstance";

const fetchPayment = async (tripId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.PAYMENT(tripId));
  return data;
};
export default fetchPayment;
