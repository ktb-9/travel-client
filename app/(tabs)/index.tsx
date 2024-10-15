import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import HotPlace from "@/components/common/hotplace/hotplace";
import UpComming from "@/components/common/upcomming/upcomming";
import History from "@/components/common/history/history";
import styles from "./styles";
export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    //컨테이너
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
      ]}
    >
      {/* 헤더 */}
      <Header toggle={toggleTheme} isDark={isDarkMode} />
      {/* 컴포넌트 */}
      <View style={styles.content}>
        <UpComming />
        <HotPlace />
        <History />
      </View>
    </SafeAreaView>
  );
}
