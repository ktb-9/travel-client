import React, { Suspense } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import Skeleton from "./skeleton/skeleton";
const Intro = React.lazy(() => import("@/components/home/intro/intro"));
const UpComming = React.lazy(
  () => import("@/components/home/upcomming/upcomming")
);
const HotPlace = React.lazy(
  () => import("@/components/home/hotplace/hotplace")
);
const History = React.lazy(() => import("@/components/home/history/history"));

export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  if (__DEV__) {
    require("../../mock/handler");
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#F8F8FA" },
      ]}
    >
      {/* 헤더 */}
      <Header toggle={toggleTheme} isDark={isDarkMode} />

      {/* Suspense Wrapper */}
      <Suspense fallback={<Skeleton />}>
        <ScrollView contentContainerStyle={styles.content}>
          <Intro />
          <UpComming />
          <HotPlace />
          <History />
        </ScrollView>
      </Suspense>
    </SafeAreaView>
  );
}
