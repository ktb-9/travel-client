import { END_POINTS } from "@/constants/api";
import axios from "axios";

interface dataState {
  body: object;
}
const postTrip = async ({ body }: dataState) => {
  const { data } = await axios.post(END_POINTS.ADDLOCATION, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default postTrip;
