import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const uploadNewLocationThumbnail = async (body: object) => {
  const { data } = await axiosInstance.post(
    END_POINTS.UPDATENEWLOCATIONTHUMBNAIL,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
export default uploadNewLocationThumbnail;
