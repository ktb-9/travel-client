import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const uploadGroupBackgroud_URL = async (body: object, groupId: number) => {
  console.log(groupId);
  const { data } = await axiosInstance.post(
    END_POINTS.UPDATEBACKGROUND_URL(groupId),
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
export default uploadGroupBackgroud_URL;
