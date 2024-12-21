import { planState, TripPlanProps } from "@/types/viewTrip/viewTrip";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import React, { useEffect, useState } from "react";
import Day from "./day/Day";
import { MaterialIcons } from "@expo/vector-icons";
import { useTripPlan } from "@/hooks/viewTrip/useTripPlan";

const TripPlan: React.FC<TripPlanProps> = ({ data }) => {
  const [days, setDays] = useState<planState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleScroll, addDays } = useTripPlan({
    days,
    setDays,
    setCurrentIndex,
  });

  useEffect(() => {
    if (data.days) {
      setDays(data.days);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addDayButton} onPress={addDays}>
        <Text style={styles.addDayText}>Day 추가</Text>
      </TouchableOpacity>

      {days.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="calendar-today" size={80} color="#CCCCCC" />
          <Text style={styles.emptyText}>아직 여행 일정이 없습니다.</Text>
        </View>
      ) : (
        <>
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
                setDays={setDays}
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
        </>
      )}
    </View>
  );
};

export default TripPlan;
