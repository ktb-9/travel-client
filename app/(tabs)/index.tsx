import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";

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
      <View style={styles.content}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
