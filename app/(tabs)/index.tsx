import React, { useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import HotPlace from "@/components/common/hotplace/hotplace";
import UpComming from "@/components/common/upcomming/upcomming";
import History from "@/components/common/history/history";
import styles from "./styles";
import Intro from "@/components/common/intro/intro";
import axios from "axios";
export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  if (__DEV__) {
    require("../../mock/handler");
  }
  // API 응답 타입 정의
  interface ExampleResponse {
    message: string;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ExampleResponse>("/api/example");
        console.log(response.data); // TypeScript는 response.data가 ExampleResponse 타입임을 알고 있음
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);
  return (
    //컨테이너
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#F8F8FA" },
      ]}
    >
      {/* 헤더 */}
      <Header toggle={toggleTheme} isDark={isDarkMode} />
      {/* 컴포넌트 */}
      <ScrollView contentContainerStyle={styles.content}>
        <Intro />
        <UpComming />
        <HotPlace />
        <History />
      </ScrollView>
    </SafeAreaView>
  );
}
