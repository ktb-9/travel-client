import { View, Text } from "react-native";
import styles from "./styles";
const renderUserLegend = (
  userColors: Record<string, string>,
  currentUserId: string
) => (
  <View style={styles.legendContainer}>
    {Object.entries(userColors).map(([userId, color]) => (
      <View key={userId} style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Text style={styles.legendText}>
          {userId === currentUserId ? "나" : `${userId}`}
        </Text>
      </View>
    ))}
  </View>
);

export default renderUserLegend;
