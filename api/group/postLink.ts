import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const postLink = async (groupId: number) => {
  const { data } = await axiosInstance.post(END_POINTS.POSTLINK(groupId));
  return data;
};
export default postLink;
