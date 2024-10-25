import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import plus from "@/assets/images/plus.png";
const Plan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>여행 일정</Text>
      </View>
      <View style={styles.content}></View>
      <TouchableOpacity>
        <Image source={plus}></Image>
      </TouchableOpacity>
    </View>
  );
};
export default Plan;
