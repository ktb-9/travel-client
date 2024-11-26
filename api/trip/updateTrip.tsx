import { END_POINTS } from "@/constants/api";

import { axiosInstance } from "../axiosinstance";
interface dataState {
  groupId: number;
  body: object;
}

const updateTrip = async ({ groupId, body }: dataState) => {
  const { data } = await axiosInstance.put(END_POINTS.trip(groupId), body);
  return data;
};
export default updateTrip;
