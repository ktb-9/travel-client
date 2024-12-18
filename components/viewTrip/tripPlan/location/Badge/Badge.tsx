import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";
import { LocationValueProps } from "@/types/viewTrip/viewTrip";

const Badge = ({ locationValue }: LocationValueProps) => {
  return (
    <View style={styles.badgeContainer}>
      <View style={styles.timeOverlay}>
        <MaterialIcons name="access-time" size={14} color="#fff" />
        <Text style={styles.visitTime}>{locationValue.visit_time}</Text>
      </View>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{locationValue.category}</Text>
      </View>
    </View>
  );
};
export default Badge;
