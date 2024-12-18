import { END_POINTS, TOKEN_KEY } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../axiosinstance";

async function postNewToken() {
  const tokensString = await AsyncStorage.getItem(TOKEN_KEY);
  const tokens = tokensString ? JSON.parse(tokensString) : null;

  if (!tokens || !tokens.refreshToken) {
    throw new Error("토큰이 존재하지 않음");
  }

  const requestData = {
    refreshToken: tokens.refreshToken, // user_id 제거
  };

  const response = await axiosInstance.post(END_POINTS.REFRESH, requestData, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  const { accessToken } = response.data;

  const newTokens = {
    ...tokens,
    accessToken,
  };

  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens));
  return { accessToken };
}
export default postNewToken;
