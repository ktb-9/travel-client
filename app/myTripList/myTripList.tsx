import { SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./styles";
const Header = React.lazy(
  () => import("@/components/myTripList/header/header")
);
const Content = React.lazy(
  () => import("@/components/myTripList/content/content")
);
import React, { Suspense } from "react";
import MyTripListSkeleton from "@/components/myTripList/skeleton/skeleton";

const myTripList = () => {
  return (
    <Suspense fallback={<MyTripListSkeleton />}>
      <SafeAreaView style={styles.container} testID="safe-area-view">
        <Header />
        <ScrollView contentContainerStyle={styles.content}>
          <Content />
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
};
export default myTripList;
