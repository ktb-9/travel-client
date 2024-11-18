import { END_POINTS } from "@/constants/api";
import axios from "axios";

const deletePayment = async (paymentId: number) => {
  console.log(paymentId);
  const { data } = await axios.delete(END_POINTS.payment(paymentId), {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default deletePayment;
