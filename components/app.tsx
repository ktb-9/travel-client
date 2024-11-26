import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { useEffect } from "react";

interface LinkingEvent {
  url: string; // 딥 링크 URL
}

const App: React.FC = () => {
  useEffect(() => {
    const handleDeepLink = async (event: LinkingEvent) => {
      const url = event.url; // 딥 링크로 전달된 URL
      console.log("Received deep link:", url);

      if (url === "yourapp://auth/status") {
        try {
          // AsyncStorage에서 userToken 가져오기
          const userToken = await AsyncStorage.getItem("userToken");

          if (userToken) {
            console.log("User is logged in with token:", userToken);
            // 로그인된 상태일 경우, 필요한 작업 수행
          } else {
            console.log("User is not logged in");
            // 로그인이 필요할 경우 처리 (ex. 로그인 화면 이동)
          }
        } catch (error) {
          console.error("Error checking user token:", error);
        }
      }
    };

    // 딥 링크 이벤트 감지
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove(); // 이벤트 리스너 정리
    };
  }, []);

  return null;
};

export default App;
