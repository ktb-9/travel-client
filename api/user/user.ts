import { END_POINTS } from "@/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchUserInfo = async (code: string) => {
  const { data } = await axiosInstance.get(
    `${END_POINTS.LOGIN}?code=${encodeURIComponent(code!)}`,
    {
      headers: {
        "Skip-Auth": true, // 토큰 없이 요청을 보냄
      },
    }
  );
  console.log(data);
  return data;
};
export default fetchUserInfo;
