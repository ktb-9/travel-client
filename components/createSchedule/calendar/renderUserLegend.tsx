import { View, Text } from "react-native";
import styles from "./styles";
const renderUserLegend = (
  userColors: Record<string, string>,
  currentUserId: string,
  userNicknames: Record<string, string>
) => (
  <View style={styles.legendContainer}>
    {Object.entries(userColors).map(([userId, color]) => (
      <View key={userId} style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Text style={styles.legendText}>
          {userId === currentUserId ? "나" : userNicknames[userId] || userId}
        </Text>
      </View>
    ))}
  </View>
);

export default renderUserLegend;
