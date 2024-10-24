import { axiosInstance } from "../axiosinstance";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../constants/api";
import { useRecoilValue } from "recoil";
import { userInfoState_unique } from "@/recoil/authState";

// 새 토큰 반환
async function postNewToken() {
  const userInfo = useRecoilValue(userInfoState_unique);
  const requestData = {
    user_id: userInfo.userId,
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
  const response = await axiosInstance.post(
    "/api/v1/auth/refresh",
    requestData
  );
  const { accessToken } = response.data;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  return { accessToken };
}
export default postNewToken;
