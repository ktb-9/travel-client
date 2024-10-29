import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import plus from "@/assets/images/plus.png";
import { useState } from "react";
import Content from "./content/content";
import { useRecoilValue } from "recoil";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";

export interface PlanType {
  day: number;
  plan: any[]; // 또는 더 구체적인 타입 정의
}
const Plan = () => {
  const groupInfo = useRecoilValue(createSchdeuleState);
  // 초기값 일정 계획
  const [dayPlan, setDayPlan] = useState<PlanType[]>([
    {
      day: 1,
      plan: [],
    },
  ]);
  const [submitData, setSubmitData] = useState<
    Array<{
      day: number;
      trip: string;
      visit: string[];
    }>
  >([]);
  //일정 추가 템플릿
  const addPlan = () => {
    const newDay: PlanType = {
      day: dayPlan.length + 1,
      plan: [],
    };
    setDayPlan([...dayPlan, newDay]);
  };
  const handleSubmit = () => {
    const data = {
      groupId: 1,
      groupName: groupInfo.groupName,
      date: groupInfo.date,
      days: submitData,
    };
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>여행 일정</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentWraper}>
          {dayPlan.map((value) => (
            <Content
              key={value.day}
              data={submitData}
              setData={setSubmitData}
              dayInfo={value}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={addPlan}>
        <Image style={styles.plusBtn} source={plus}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>일정확정</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Plan;
