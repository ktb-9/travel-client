import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchGroup = async (groupId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.GETGROUP(groupId));
  return data;
};
export default fetchGroup;
