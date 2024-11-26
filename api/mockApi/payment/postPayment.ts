import { END_POINTS } from "@/constants/api";
import axios from "axios";

const postPayment = async (body: object) => {
  const { data } = await axios.post(END_POINTS.postPayment, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default postPayment;
