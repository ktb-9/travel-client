// Frontend (React Native)
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { atom, useSetRecoilState } from "recoil";

export const userInfoState_unique = atom({
  key: "userInfoState_unique",
  default: {
    userId: "",
    nickname: "",
    profileImage: "",
  },
});

const REDIRECT_URI = `http://localhost:8081/oauth/kakao/callback`;
const SERVER_URL = "http://localhost:9090";

export default function LoginScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState_unique);

  const handleKakaoLogin = () => {
    setError(null);
    setShowWebView(true);
  };

  const handleNavigationStateChange = async (navState: any) => {
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
        const response = await fetch(
          `${SERVER_URL}/auth/oauth/kakao/callback?code=${encodeURIComponent(
            code!
          )}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server didn't return JSON");
        }

        const data = await response.json();
        console.log(data);
        setUserInfo(data);
        setShowWebView(false);
        router.replace("/home/home");
      } catch (error) {
        console.error("Error during login:", error);
        setError("로그인 처리 중 오류가 발생했습니다");
        setShowWebView(false);
      }
    }
  };

  if (showWebView) {
    return (
      <WebView
        source={{
          uri: `${SERVER_URL}/auth/kakao/login?redirectUri=${encodeURIComponent(
            REDIRECT_URI
          )}`,
        }}
        onNavigationStateChange={handleNavigationStateChange}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});
