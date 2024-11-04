import { planState } from "@/types/viewTrip/viewTrip";
import { Dimensions, ScrollView, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Day from "./day/Day";
const { width } = Dimensions.get("window");
const TripPlan = ({ data }: { data: planState[] }) => {
  // 슬라이드할 카드 컴포넌트 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = (event: any) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(nextIndex);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((plan) => Day(plan))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
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
