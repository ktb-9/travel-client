import { LocationTabsProps } from "@/types/map/map";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const LocationTabs = ({
  newLocation,
  currentLocationIndex,
  setCurrentLocationIndex,
  addNewLocation,
}: LocationTabsProps) => {
  return (
    <View style={styles.locationTabs}>
      {newLocation.locations.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.locationTab,
            currentLocationIndex === index && styles.activeLocationTab,
          ]}
          onPress={() => setCurrentLocationIndex(index)}
        >
          <Text style={styles.locationTabText}>장소 {index + 1}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addLocationButton}
        onPress={addNewLocation}
      >
        <MaterialIcons name="add" size={24} color="#4A90E2" />
      </TouchableOpacity>
    </View>
  );
};
export default LocationTabs;
