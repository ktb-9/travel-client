import { END_POINTS } from "@/constants/api";
import axios from "axios";
interface dataState {
  tripId: number;
  body: object;
}
const updateTripGroup = async ({ tripId, body }: dataState) => {
  const { data } = await axios.put(END_POINTS.UPDATEGROUP(tripId), body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });

  return data;
};
export default updateTripGroup;
