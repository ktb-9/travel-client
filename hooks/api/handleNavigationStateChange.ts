import { Router } from "expo-router";
import fetchUserInfo from "@/api/user/user";
import { REDIRECT_URI } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NavState {
  url: string;
}

interface HandleNavigationStateChangeProps {
  navState: NavState;
  setShowWebView: (state: boolean) => void;
  setError: (error: string | null) => void;
  setUserInfo: (userInfo: any) => void;
  router: Router;
}

export const handleNavigationStateChange = async ({
  navState,
  setShowWebView,
  setError,
  router,
}: HandleNavigationStateChangeProps) => {
  if (navState.url && navState.url.startsWith(REDIRECT_URI)) {
    const params = new URLSearchParams(navState.url.split("?")[1]);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      setError("카카오 로그인 실패");
      setShowWebView(false);
      return;
    }

    try {
      // 사용자 정보를 요청
      const response = await fetchUserInfo(code!);

      // JSON 데이터를 AsyncStorage에 저장
      await AsyncStorage.setItem("userTokens", JSON.stringify(response.tokens));
      await AsyncStorage.setItem("userInfo", JSON.stringify(response.user));

      setShowWebView(false);
      router.replace("/home/home"); // 홈으로 리다이렉트
    } catch (error) {
      console.error("Error during login:", error);
      setError("로그인 처리 중 오류가 발생했습니다");
      setShowWebView(false);
    }
  }
};
