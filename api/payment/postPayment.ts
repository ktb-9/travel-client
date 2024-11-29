import { END_POINTS } from "@/constants/api";
import axios from "axios";
import { axiosInstance } from "../axiosinstance";

const postPayment = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.POSTPAYMENT, body);
  return data;
};
export default postPayment;
