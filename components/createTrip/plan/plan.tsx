import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import plus from "@/assets/images/plus.png";
import { useState } from "react";
import Content from "./content/content";

export interface PlanType {
  day: number;
  plan: any[]; // 또는 더 구체적인 타입 정의
}
const Plan = () => {
  // 초기값 일정 계획
  const [dayPlan, setDayPlan] = useState<PlanType[]>([
    {
      day: 1,
      plan: [],
    },
  ]);

  //일정 추가 템플릿
  const addPlan = () => {
    const newDay: PlanType = {
      day: dayPlan.length + 1,
      plan: [],
    };
    setDayPlan([...dayPlan, newDay]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>여행 일정</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentWraper}>
          {dayPlan.map((value) => (
            <Content key={value.day} dayInfo={value} />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={addPlan}>
        <Image style={styles.plusBtn} source={plus}></Image>
      </TouchableOpacity>
    </View>
  );
};
export default Plan;
