import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const deleteLocation = async (locationId: number) => {
  const { data } = await axiosInstance.delete(END_POINTS.trip(locationId));
  return data;
};
export default deleteLocation;
