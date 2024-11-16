import { END_POINTS } from "@/constants/api";
import axios from "axios";

const fetchPayment = async (groupId: number) => {
  const { data } = await axios.get(END_POINTS.payment(groupId), {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default fetchPayment;
