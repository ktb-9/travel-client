import React, { Suspense, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/header/header";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import Skeleton from "./skeleton/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/querykeys";
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
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.upcomming,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.history,
      });
    } catch (error) {
      console.error("새로고침 실패 :", error);
    } finally {
      setRefreshing(false);
    }
  };

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
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Intro />
          <UpComming />
          <HotPlace />
          <History />
        </ScrollView>
      </Suspense>
    </SafeAreaView>
  );
}
