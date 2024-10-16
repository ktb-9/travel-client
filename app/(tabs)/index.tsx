import React from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import HotPlace from "@/components/common/hotplace/hotplace";
import UpComming from "@/components/common/upcomming/upcomming";
import History from "@/components/common/history/history";
import styles from "./styles";
import Intro from "@/components/common/intro/intro";
export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

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
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            width: "100%",
            paddingLeft: 30,
          }}
        >
          추억을 담아
        </Text>
        <History />
      </ScrollView>
    </SafeAreaView>
  );
}
