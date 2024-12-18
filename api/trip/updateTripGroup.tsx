import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";
interface dataState {
  tripId: number;
  body: object;
}
const updateTripGroup = async ({ tripId, body }: dataState) => {
  const { data } = await axiosInstance.put(
    END_POINTS.UPDATEGROUP(tripId),
    body
  );

  return data;
};
export default updateTripGroup;
