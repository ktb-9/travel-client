import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import plus from "@/assets/images/plus.png";
import { useState } from "react";
import Content from "./content/content";
const Plan = () => {
  const [dayPlan, setDayPlan] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>여행 일정</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentWraper}>
          <Content />
        </View>
      </View>
      <TouchableOpacity>
        <Image style={styles.plusBtn} source={plus}></Image>
      </TouchableOpacity>
    </View>
  );
};
export default Plan;
