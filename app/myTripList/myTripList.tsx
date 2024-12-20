import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "./styles";
const Header = React.lazy(() => import("@/components/common/Header/header"));
const Content = React.lazy(
  () => import("@/components/myTripList/content/content")
);
import React, { Suspense, useState } from "react";
import MyTripListSkeleton from "@/components/myTripList/skeleton/skeleton";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/querykeys";

const myTripList = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getMyTrip,
      });
    } catch (error) {
      console.error("새로고침 실패 :", error);
    } finally {
      setRefreshing(false);
    }
  };
  const router = useRouter();
  return (
    <Suspense fallback={<MyTripListSkeleton />}>
      <SafeAreaView style={styles.container} testID="safe-area-view">
        <Header
          title="내 여행 리스트"
          onPress={() => router.push("/home/home")}
        />
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Content />
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
};
export default myTripList;
