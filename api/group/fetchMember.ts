import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchMember = async (groupId: number) => {
  const { data } = await axiosInstance.get(END_POINTS.GETMEMBER(groupId));
  return data;
};

export default fetchMember;
