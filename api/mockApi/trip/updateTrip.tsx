import { END_POINTS } from "@/constants/api";
import axios from "axios";
interface dataState {
  groupId: number;
  locationId: number;
  body: object;
}

const updateTrip = async ({ groupId, locationId, body }: dataState) => {
  const { data } = await axios.put(END_POINTS.trip(locationId), body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default updateTrip;
