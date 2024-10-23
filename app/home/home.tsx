import React from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import HotPlace from "@/components/common/hotplace/hotplace";
import UpComming from "@/components/common/upcomming/upcomming";
import History from "@/components/common/history/history";
import styles from "./styles";
import Intro from "@/components/common/intro/intro";
import exampleQuery from "@/hooks/api/exampleQuery";
import { useRecoilValue } from "recoil";
import { userInfoState_unique } from "../(tabs)";
export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  if (__DEV__) {
    require("../../mock/handler");
  }
  const { data } = exampleQuery();
  console.log(data);
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
