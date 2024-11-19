import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const postGroup = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.ADDGROUP, body);
  return data;
};
export default postGroup;
