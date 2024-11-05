import { planState, tripState } from "@/types/viewTrip/viewTrip";
import { Dimensions, ScrollView, View } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import Day from "./day/Day";
import { useRecoilState } from "recoil";
import { locationState } from "@/recoil/tripState";
const { width } = Dimensions.get("window");
const TripPlan = ({ data }: { data: tripState }) => {
  // 슬라이드할 카드 컴포넌트 인덱스
  const [, setTrip] = useRecoilState(locationState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = (event: any) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(nextIndex);
  };
  useEffect(() => {
    if (data) {
      setTrip(data);
    }
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.days?.map((plan, index) => Day(plan))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.days?.map((_, index) => (
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
