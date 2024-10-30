import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { LocationItemProps } from "@/types/createTrip/createTrip";

const LocationItem = ({ location, isLast, onDelete }: LocationItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.resultItem, isLast && styles.lastResultItem]}
    >
      <View style={styles.itemLeftContent}>
        <View style={styles.resultIconContainer}>
          <Ionicons name="location" size={20} color="#0066cc" />
        </View>
        <View style={styles.resultTextContainer}>
          <Text style={styles.locationName}>{location.name}</Text>
          {location.address && (
            <Text style={styles.locationAddress}>{location.address}</Text>
          )}
          {location.visitTime && (
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.visitTime}>{location.visitTime}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="close-circle" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default LocationItem;
