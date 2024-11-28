import { END_POINTS } from "@/constants/api";

import { axiosInstance } from "../axiosinstance";

const updatePayment = async (value: object) => {
  const { data } = await axiosInstance.put(END_POINTS.POSTPAYMENT, value);
  return data;
};
export default updatePayment;
