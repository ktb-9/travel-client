import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const deletePayment = async (paymentId: number) => {
  const { data } = await axiosInstance.delete(
    END_POINTS.DELETEPAYMENT(paymentId)
  );
  return data;
};
export default deletePayment;
