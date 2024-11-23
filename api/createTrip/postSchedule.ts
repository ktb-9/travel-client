import { END_POINTS } from "@/constants/api";
import { ScheduleData } from "@/types/createTrip/createTrip";
import { axiosInstance } from "../axiosinstance";

const postSchedule = async (body: ScheduleData) => {
  const { data } = await axiosInstance.post(END_POINTS.SCHEDULE, body);
  return data;
};
export default postSchedule;
