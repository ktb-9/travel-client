import React, { useState, useEffect, Suspense } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import styles from "./styles";
import Header from "@/components/common/Header/header";
import { useRouter } from "expo-router";
import Button from "@/components/common/Button/button";
const Infos = React.lazy(() => import("@/components/viewTrip/Infos/infos"));
const Payment = React.lazy(
  () => import("@/components/viewTrip/payment/payment")
);
import TripLoading from "./tripLoading/tripLoading";
import Skeleton from "./skeleton/skeleton";

const ViewTrip = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // 최소 2초 동안 로딩 상태 유지
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (!isReady) return <TripLoading />;
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<TripLoading />}>
        <Header
          onPress={() => router.push("/myTripList/myTripList")}
          title="여행 일정"
        />
        <ScrollView contentContainerStyle={styles.content}>
          <Suspense fallback={<Skeleton />}>
            <Infos />
            <Payment />
          </Suspense>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <Button
            variant="primary"
            title="여행 종료"
            onPress={() => router.push("/summary/Summary")}
          />
        </View>
      </Suspense>
    </SafeAreaView>
  );
};

export default ViewTrip;
