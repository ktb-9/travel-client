import { planState, tripState } from "@/types/viewTrip/viewTrip";
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import Day from "./day/Day";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface TripPlanProps {
  data: tripState; // TripPlanProps의 data는 tripState 타입
}

const TripPlan: React.FC<TripPlanProps> = ({ data }) => {
  const [fontsLoaded] = useFonts({
    NotoBold: require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });

  const [days, setDays] = useState<planState[]>([]); // days의 타입을 planState[]로 설정

  useEffect(() => {
    if (data.days) {
      setDays(data.days); // data.days로 days를 초기화
    }
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(nextIndex);
  };

  const addDays = () => {
    const newDays = {
      day: days.length + 1,
      destination: "",
      locations: [],
    };
    setDays((prev) => [...prev, newDays]);
  };

  if (!fontsLoaded) return null;

  // days 배열이 비어있거나 undefined인 경우 처리
  if (days.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity style={styles.addDayButton} onPress={addDays}>
          <MaterialIcons name="add" size={40} color="#007AFF" />
          <Text style={styles.addDayText}>Day 추가</Text>
        </TouchableOpacity>
        <MaterialIcons name="calendar-today" size={80} color="#CCCCCC" />
        <Text style={styles.emptyText}>아직 여행 일정이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addDayButton} onPress={addDays}>
        <MaterialIcons name="add" size={40} color="#007AFF" />
        <Text style={styles.addDayText}>Day 추가</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {days.map((plan, index) => (
          <Day
            key={index}
            day={plan.day}
            destination={plan.destination}
            locations={plan.locations || []}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {days.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default TripPlan;
