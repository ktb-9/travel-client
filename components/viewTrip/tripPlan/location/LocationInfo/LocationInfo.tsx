import { Location, LocationValueProps } from "@/types/viewTrip/viewTrip";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";
interface LocationInfoProps {
  locationValue: Location;
  renderHashtags: () => React.ReactNode; // 콜백 함수가 JSX를 반환
}
const LocationInfo = ({ locationValue, renderHashtags }: LocationInfoProps) => {
  return (
    <>
      <View style={styles.locationHeader}>
        <Text style={styles.locationName}>{locationValue.name}</Text>
      </View>

      {renderHashtags()}

      <View style={styles.infoContainer}>
        <View style={styles.addressContainer}>
          <MaterialIcons name="location-on" size={16} color="#4B5563" />
          <Text style={styles.address} numberOfLines={1}>
            {locationValue.address}
          </Text>
        </View>
      </View>
    </>
  );
};
export default LocationInfo;
