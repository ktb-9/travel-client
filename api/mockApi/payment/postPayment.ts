import { END_POINTS } from "@/constants/api";
import axios from "axios";

const postPayment = async (body: object) => {
  console.log(body);
  const { data } = await axios.post(END_POINTS.payment, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default postPayment;
