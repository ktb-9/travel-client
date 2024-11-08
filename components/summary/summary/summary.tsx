import { Text, View } from "react-native";
import styles from "./styles";

const Summary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.summaryText}>이번 여행 요약입니다...</Text>
      <Text style={styles.tripText}>여행 장소</Text>
    </View>
  );
};
export default Summary;
