import { END_POINTS } from "@/constants/api";
import axios from "axios";

interface updateState {
  groupId: number;
  value: object;
}
const updatePayment = async ({ groupId, value }: updateState) => {
  console.log(value);
  const { data } = await axios.put(END_POINTS.payment(groupId), value, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default updatePayment;
