import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import ExpenseAnalysis from "./expensesAnalysis";
import styles from "./styles";
export const tripData = {
  date: "2024.11.05~2024.11.08",
  groupName: "청바지",
  groupId: 1,
  days: [
    {
      day: 1,
      destination: "부산",
      locations: [
        {
          locationId: 1,
          name: "광안리해수욕장",
          address: "부산 수영구 광안해변로 219",
          visitTime: "21:24",
          category: "관광지",
          hashtag: "#바다 #헤엄 #회 #너 담금 ",
          thumbnail:
            "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/09b2a36d-5f73-4899-98e3-3c1acc9d6e9e.jpeg",
        },
        {
          locationId: 2,
          name: "퍼지네이블 광안점",
          address: "부산 수영구 광안해변로 177",
          visitTime: "22:24",
          category: "음식점",
          hashtag: "#여기 칵테일 맛집, #술 배틀 #헌팅",
          thumbnail:
            "https://d12zq4w4guyljn.cloudfront.net/750_750_20240712220330_photo1_01a240f27188.jpg",
        },
      ],
    },
    {
      day: 2,
      destination: "부산",
      locations: [
        {
          locationId: 3,
          name: "롯데월드 어드벤처 부산",
          address: "부산 기장군 기장읍 동부산관광로 42",
          visitTime: "09:00",
          category: "관광지",
          hashtag: "",
          thumbnail:
            "https://cdn.3hoursahead.com/v2/content/image-comp/e97996d7-ee34-46af-a273-d6d420129011.webp",
        },
        {
          locationId: 4,
          name: "감천문화마을",
          address: "부산 사하구 감내1로 200",
          visitTime: "16:00",
          category: "관광지",
          hashtag: "",
          thumbnail:
            "https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjNfMjU2/MDAxNjkyNzQ4MTY0OTE4.OBV1EYBpAFy0LRQNbg5SbuH230dGu9A8ij9GKJMaeJsg.qC7zW-Pn6GmT1nE-ojaO0JfEFZN5x0gGQ2FwSO9e5Rwg.JPEG.julian1366/20230812_092058.jpg",
        },
      ],
    },
    {
      day: 3,
      destination: "경주",
      locations: [
        {
          locationId: 5,
          name: "첨성대",
          address: "경북 경주시 인왕동 839-1",
          visitTime: "13:30",
          category: "관광지",
          hashtag: "",
          thumbnail:
            "https://tourimage.interpark.com/BBS/Tour/FckUpload/201207/6347676482867224740.jpg",
        },
        {
          locationId: 6,
          name: "황리단길",
          address: "경북 경주시 태종로 746",
          visitTime: "17:24",
          category: "관광지",
          hashtag: "",
          thumbnail:
            "https://www.imaeil.com/photos/2023/04/06/2023040613530176498_l.jpg",
        },
      ],
    },
    {
      day: 4,
      destination: "광주",
      locations: [
        {
          locationId: 7,
          name: "광주솔로몬로파크",
          address: "광주 북구 오문로 244",
          visitTime: "11:24",
          category: "관광지",
          hashtag: "",
          thumbnail:
            "https://cdn.newscj.com/news/photo/202404/3132783_3159997_5124.jpg",
        },
      ],
    },
  ],
};

const TripSummary = () => {
  const allDestinations = [
    ...new Set(tripData.days.map((day) => day.destination)),
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.card}>
          {/* 헤더 영역 */}
          <View style={styles.headerRow}>
            <View style={styles.groupInfo}>
              <Text>👥</Text>
              <Text style={styles.groupName}>{tripData.groupName}</Text>
            </View>
            <View style={styles.dateInfo}>
              <Text>📅</Text>
              <Text style={styles.dateText}>{tripData.date}</Text>
            </View>
          </View>

          {/* 경로 정보 */}
          <View style={styles.routeInfo}>
            <Text>📍</Text>
            <Text style={styles.routeText}>{allDestinations.join(" → ")}</Text>
          </View>

          {/* 일자별 정보 */}
          {tripData.days.map((day) => (
            <View key={day.day} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <View style={styles.dayCircle}>
                  <Text style={styles.dayNumber}>Day{day.day}</Text>
                </View>
                <View style={styles.dayInfo}>
                  <Text style={styles.destinationText}>{day.destination}</Text>
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
                      source={{ uri: location.thumbnail }}
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
          ))}
        </View>

        {/* 통계 카드 */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>여행 통계</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{tripData.days.length}</Text>
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
                {tripData.days.reduce(
                  (sum, day) => sum + day.locations.length,
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
