import React from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import HotPlace from "@/components/home/hotplace/hotplace";
import UpComming from "@/components/home/upcomming/upcomming";
import History from "@/components/home/history/history";
import Intro from "@/components/home/intro/intro";
import styles from "./styles";

export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  if (__DEV__) {
    require("../../mock/handler");
  }

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
