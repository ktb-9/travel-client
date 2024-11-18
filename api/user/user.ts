import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchUserInfo = async (code: string) => {
  const { data } = await axiosInstance.get(
    `${END_POINTS.LOGIN}?code=${encodeURIComponent(code)}`,
    {
      headers: {
        "Skip-Auth": true,
      },
    }
  );
  return data;
};
export default fetchUserInfo;
