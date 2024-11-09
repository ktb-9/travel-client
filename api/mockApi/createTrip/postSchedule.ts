import { END_POINTS } from "@/constants/api";
import { ScheduleData } from "@/types/createTrip/createTrip";
import axios from "axios";

const postSchedule = async (body: ScheduleData) => {
  const { data } = await axios.post(END_POINTS.SCHEDULE, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default postSchedule;
