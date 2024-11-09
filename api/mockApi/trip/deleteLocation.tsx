import { END_POINTS } from "@/constants/api";
import axios from "axios";

const deleteLocation = async (locationId: number) => {
  const { data } = await axios.delete(END_POINTS.trip(locationId), {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default deleteLocation;
