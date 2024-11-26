import { axiosInstance } from "@/api/axiosinstance";
import { END_POINTS } from "@/constants/api";

interface dataState {
  groupId: number;
  body: object;
}

const updateTrip = async ({ groupId, body }: dataState) => {
  const { data } = await axiosInstance.put(END_POINTS.trip(groupId), body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default updateTrip;
