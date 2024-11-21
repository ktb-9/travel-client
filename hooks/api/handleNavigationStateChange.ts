import { Router } from "expo-router";
import fetchUserInfo from "@/api/user/user";
import { REDIRECT_URI, TOKEN_KEY, USER_INFO_KEY } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetterOrUpdater } from "recoil";

interface NavState {
  url: string;
}
interface authType {
  id: number;
  nickname: string;
  profileImage: string;
}

interface HandleNavigationStateChangeProps {
  navState: NavState;
  setShowWebView: (state: boolean) => void;
  setError: (error: string | null) => void;
  router: Router;
  setUser: SetterOrUpdater<authType>;
}

export const handleNavigationStateChange = async ({
  navState,
  setShowWebView,
  setError,
  router,
  setUser,
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
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(response.tokens));
      await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(response.user));

      const user = await AsyncStorage.getItem(USER_INFO_KEY);
      setUser(user ? JSON.parse(user) : null);
      setShowWebView(false);
      router.replace("/home/home"); // 홈으로 리다이렉트
    } catch (error) {
      console.error("Error during login:", error);
      setError("로그인 처리 중 오류가 발생했습니다");
      setShowWebView(false);
    }
  }
};
