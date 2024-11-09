// Frontend (React Native)
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import { useSetRecoilState } from "recoil";
import styles from "./styles";
import { handleNavigationStateChange } from "@/hooks/api/handleNavigationStateChange";
import { userInfoState_unique } from "@/recoil/authState";
import { AXIOS_BASE_URL, REDIRECT_URI } from "@/constants/api";
import kakao from "@/assets/images/kakao.png";
export default function LoginScreen() {
  // 웹뷰 상태
  const [showWebView, setShowWebView] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState_unique);

  const handleKakaoLogin = () => {
    setError(null);
    setShowWebView(true);
  };
  //   웹뷰 보여주기
  if (showWebView) {
    return (
      <WebView
        source={{
          uri: `${AXIOS_BASE_URL}/auth/kakao/login?redirectUri=${encodeURIComponent(
            REDIRECT_URI
          )}`,
        }}
        onNavigationStateChange={(navState) =>
          handleNavigationStateChange({
            navState,
            setShowWebView,
            setError,
            setUserInfo,
            router,
          })
        }
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        testID="kakao"
        style={styles.kakaoButton}
        onPress={handleKakaoLogin}
      >
        <Image source={kakao} style={styles.kakaoImage} />
      </TouchableOpacity>
    </View>
  );
}
