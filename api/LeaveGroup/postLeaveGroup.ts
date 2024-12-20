import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const postLeaveGroup = async (tripId: number) => {
  const { data } = await axiosInstance.delete(END_POINTS.LEAVEGROUP(tripId));
  return data;
};
export default postLeaveGroup;
