import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const joinExistingGroup = async (groupId: number) => {
  console.log("방구");
  const { data } = await axiosInstance.get(END_POINTS.EXISTINGGROUP(groupId));
  return data;
};
export default joinExistingGroup;
