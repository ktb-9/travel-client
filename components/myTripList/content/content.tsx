import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useMyTripGroupQuery from "@/hooks/api/useMyTripGroupQuery";
import styles from "./styles";
import { tripListType } from "@/types/myTripList/myTripList";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import tripIdState from "@/recoil/tripIdState";

const Content = () => {
  const { data } = useMyTripGroupQuery();
  const [, setTripId] = useRecoilState(tripIdState);
  const router = useRouter();

  const handleTrip = useCallback(
    (trip_id: number) => {
      router.push(`/trip/${trip_id}`);
      setTripId(trip_id);
    },
    [router, setTripId]
  );

  const renderTripList = useMemo(() => {
    if (!data) return null;

    return data.map((trip: tripListType) => (
      <TouchableOpacity
        key={trip.trip_id}
        style={styles.tripCard}
        activeOpacity={0.7}
        onPress={() => handleTrip(trip.trip_id)}
      >
        <View style={styles.tripHeader}>
          <View
            style={{
              ...styles.tripIconContainer,
              backgroundColor: trip.finish ? "#22C55E" : "#3B82F6",
            }}
          >
            <Ionicons name="airplane" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.tripName} numberOfLines={1}>
            {trip.group_name}
          </Text>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text style={styles.dateText}>{trip.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.createdText}>
              {new Date(trip.created_date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              생성
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }, [data, handleTrip]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>나의 여행</Text>
      {/* 상태 표시 범례 추가 */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#22C55E" }]} />
          <Text style={styles.legendText}>완료</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#3B82F6" }]} />
          <Text style={styles.legendText}>진행중</Text>
        </View>
      </View>
      {renderTripList}
    </ScrollView>
  );
};

export default Content;
