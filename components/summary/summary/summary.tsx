import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import ExpenseAnalysis from "./expensesAnalysis";
import styles from "./styles";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import tripQuery from "@/hooks/api/tripQuery";
import { defaults } from "@/constants/default";

const TripSummary = () => {
  const tripId = useRecoilValue(tripIdState);
  const { data } = tripQuery(tripId);
  const allDestinations = [
    ...new Set(
      data.days.map((day: { destination: string }) => day.destination)
    ),
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.card}>
          {/* 헤더 영역 */}
          <View style={styles.headerRow}>
            <View style={styles.groupInfo}>
              <Text>👥</Text>
              <Text style={styles.groupName}>{data.groupName}</Text>
            </View>
            <View style={styles.dateInfo}>
              <Text>📅</Text>
              <Text style={styles.dateText}>{data.date}</Text>
            </View>
          </View>

          {/* 경로 정보 */}
          <View style={styles.routeInfo}>
            <Text>📍</Text>
            <Text style={styles.routeText}>{allDestinations.join(" → ")}</Text>
          </View>

          {/* 일자별 정보 */}
          {data.days.map(
            (day: { day: string; destination: string; locations: any[] }) => (
              <View key={day.day} style={styles.dayContainer}>
                <View style={styles.dayHeader}>
                  <View style={styles.dayCircle}>
                    <Text style={styles.dayNumber}>Day{day.day}</Text>
                  </View>
                  <View style={styles.dayInfo}>
                    <Text style={styles.destinationText}>
                      {day.destination}
                    </Text>
                    <Text style={styles.locationCount}>
                      {day.locations.length}곳 방문
                    </Text>
                  </View>
                </View>

                {/* 장소 목록 */}
                {day.locations.map((location) => (
                  <View key={location.locationId} style={styles.locationCard}>
                    <View style={styles.locationContent}>
                      <Image
                        source={{ uri: location.thumbnail || defaults.gt }}
                        style={styles.locationImage}
                      />
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationName}>{location.name}</Text>
                        <Text style={styles.locationTime}>
                          {location.visitTime}
                        </Text>
                        {location.hashtag && (
                          <Text style={styles.hashTag}>{location.hashtag}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )
          )}
        </View>

        {/* 통계 카드 */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>여행 통계</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{data.days.length}</Text>
              <Text style={styles.statLabel}>총 일수</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.statNumberRed]}>
                {allDestinations.length}
              </Text>
              <Text style={styles.statLabel}>방문 도시</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.statNumberYellow]}>
                {data.days.reduce(
                  (sum: number, day: any) => sum + day.locations.length,
                  0
                )}
              </Text>
              <Text style={styles.statLabel}>방문 장소</Text>
            </View>
          </View>
        </View>
      </View>
      <ExpenseAnalysis />
    </ScrollView>
  );
};

export default TripSummary;
