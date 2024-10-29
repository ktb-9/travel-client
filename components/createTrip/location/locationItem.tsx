import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../plan/content/styles";

interface Location {
  name: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
interface LocationItemProps {
  location: Location;
  isLast: boolean;
  onDelete: () => void;
}
const LocationItem = ({ location, isLast, onDelete }: LocationItemProps) => (
  <TouchableOpacity
    style={[styles.resultItem, isLast && styles.lastResultItem]}
  >
    <View style={styles.resultIconContainer}>
      <Ionicons name="location" size={20} color="#0066cc" />
    </View>
    <View style={styles.resultTextContainer}>
      <Text>{location.name}</Text>
      {location.address && <Text>{location.address}</Text>}
    </View>
    <TouchableOpacity onPress={onDelete}>
      <Ionicons name="close-circle" size={20} color="#666" />
    </TouchableOpacity>
  </TouchableOpacity>
);
export default LocationItem;
