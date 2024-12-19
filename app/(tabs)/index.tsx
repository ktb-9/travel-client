import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import styles from "./styles";
import { handleNavigationStateChange } from "@/hooks/api/handleNavigationStateChange";
import { AXIOS_BASE_URL, REDIRECT_URI, TOKEN_KEY } from "@/constants/api";
import kakao from "@/assets/images/kakao.png";
import { useRecoilState } from "recoil";
import authState from "@/recoil/authState";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreen() {
  // 웹뷰 상태
  const [showWebView, setShowWebView] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const checkToken = async () => {
  //   const tokensString = await AsyncStorage.getItem(TOKEN_KEY);

  //   if (tokensString != undefined) router.push("/home/home");
  // };
  // useEffect(() => {
  //   checkToken();
  // }, []);
  const [, setUser] = useRecoilState(authState);

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
            router,
            setUser,
          })
        }
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>리플 트립</Text>
      </View>

      <View style={styles.loginContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          testID="kakao"
          style={styles.kakaoButton}
          onPress={handleKakaoLogin}
        >
          <Text style={styles.kakaoText}>카카오로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
