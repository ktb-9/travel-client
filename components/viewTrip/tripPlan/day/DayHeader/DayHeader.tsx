import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { DayHeaderProps } from "@/types/viewTrip/viewTrip";

const DayHeader = ({
  day,
  destination,
  locations,
  setIsAddModalVisible,
}: DayHeaderProps) => {
  return (
    <View style={styles.dayHeader}>
      <View style={styles.dayInfo}>
        <Text style={styles.dayText}>{day} 일차</Text>
        <View style={styles.destinationContainer}>
          <MaterialIcons name="place" size={20} color="#4E5968" />
          <Text style={styles.destinationText}>{destination}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{locations.length}곳</Text>
          </View>
        </View>
      </View>
      <View style={{ display: "flex", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Text style={styles.addButtonText}>새로운 장소 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DayHeader;
