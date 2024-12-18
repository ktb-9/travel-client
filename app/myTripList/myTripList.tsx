import { SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./styles";
const Header = React.lazy(() => import("@/components/common/Header/header"));
const Content = React.lazy(
  () => import("@/components/myTripList/content/content")
);
import React, { Suspense } from "react";
import MyTripListSkeleton from "@/components/myTripList/skeleton/skeleton";
import { useRouter } from "expo-router";

const myTripList = () => {
  const router = useRouter();
  return (
    <Suspense fallback={<MyTripListSkeleton />}>
      <SafeAreaView style={styles.container} testID="safe-area-view">
        <Header
          title="내 여행 리스트"
          onPress={() => router.push("/home/home")}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <Content />
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
};
export default myTripList;
