import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const uploadLocationThumbnail = async (body: object, locationId: number) => {
  const { data } = await axiosInstance.post(
    END_POINTS.UPDATELOCATIONTHUMBNAIL(locationId),
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
export default uploadLocationThumbnail;
