import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const uploadGroupThumbnail = async (body: object, groupId: number) => {
  console.log(groupId);
  const { data } = await axiosInstance.post(
    END_POINTS.UPDATEGROUPTHUMBNAIL(groupId),
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
export default uploadGroupThumbnail;
