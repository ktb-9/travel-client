import { View, Text } from "react-native";
import styles from "./styles";
const renderDays = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <View style={styles.daysRow}>
      {days.map((day, index) => (
        <Text
          key={index}
          style={[styles.dayText, index === 0 && styles.sundayText]}
        >
          {day}
        </Text>
      ))}
    </View>
  );
};
export default renderDays;
