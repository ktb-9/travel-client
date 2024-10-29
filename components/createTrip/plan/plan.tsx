import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import plus from "@/assets/images/plus.png";
import { useState } from "react";
import Content from "./content/content";
import { useRecoilState, useRecoilValue } from "recoil";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import { tripPlanState } from "@/recoil/tripPlanState";

const Plan = () => {
  const groupInfo = useRecoilValue(createSchdeuleState);
  const [tripPlan, setTripPlan] = useRecoilState(tripPlanState);

  //일정 추가 템플릿
  const addDay = () => {
    setTripPlan((prev) => ({
      ...prev,
      days: [
        ...prev.days,
        {
          day: prev.days.length + 1,
          destination: "",
          locations: [],
        },
      ],
    }));
  };
  const handleSubmit = () => {
    setTripPlan((prevPlan) => ({
      ...prevPlan,
      date: groupInfo.date,
      groupId: 1,
      groupName: groupInfo.groupName,
    }));
    console.log(tripPlan);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>여행 일정</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentWraper}>
          {tripPlan.days.map((value) => (
            <Content key={value.day} dayPlan={value} />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={addDay}>
        <Image style={styles.plusBtn} source={plus}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>일정확정</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Plan;
