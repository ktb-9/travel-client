import { END_POINTS } from "@/constants/api";
import axios from "axios";
import { axiosInstance } from "../axiosinstance";

interface dataState {
  body: object;
}
const postTrip = async ({ body }: dataState) => {
  const { data } = await axiosInstance.post(END_POINTS.ADDLOCATION, body);
  return data;
};
export default postTrip;
