import React, { useState, useEffect, Suspense } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import styles from "./styles";
import Header from "@/components/common/Header/header";
import { Stack, useRouter } from "expo-router";
import Button from "@/components/common/Button/button";
const Infos = React.lazy(() => import("@/components/viewTrip/Infos/infos"));
const Payment = React.lazy(
  () => import("@/components/viewTrip/payment/payment")
);
import TripLoading from "./tripLoading/tripLoading";
import Skeleton from "./skeleton/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/querykeys";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";

const ViewTrip = () => {
  const router = useRouter();
  const tripId = useRecoilValue(tripIdState);
  const [isReady, setIsReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const onRefresh = async () => {
    setRefreshing(true); // 새로고침 상태 시작

    try {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.getTrip, tripId],
      });
      // 데이터를 무효화하고 다시 가져오기
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.getPayment, tripId],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.getPaymentMember, tripId],
      });
    } catch (error) {
      console.error("새로고침 실패 :", error);
    } finally {
      setRefreshing(false); // 새로고침 상태 종료
    }
  };
  useEffect(() => {
    // 최소 2초 동안 로딩 상태 유지
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (!isReady) return <TripLoading />;
  return (
    <>
      <Stack.Screen
        options={{
          gestureEnabled: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <Suspense fallback={<TripLoading />}>
          <Header
            onPress={() => router.push("/myTripList/myTripList")}
            title="여행 일정"
          />
          <ScrollView
            contentContainerStyle={styles.content}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
    </>
  );
};

export default ViewTrip;
