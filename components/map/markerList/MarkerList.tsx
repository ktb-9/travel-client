import styles from "@/app/map/styles";
import { useHandleMarkerPress } from "@/hooks/map/useHandleMarkerPress";
import { SearchResult, SelectedPlace } from "@/types/map/map";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
interface MarkerListProps {
  markers: SearchResult[];
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const MarkerList = ({
  markers,
  setSelectedPlace,
  setShowModal,
}: MarkerListProps) => {
  return (
    <>
      {markers.map((result, index) => (
        <Marker
          key={`${result.id}-${index}`}
          coordinate={{
            latitude: parseFloat(result.y),
            longitude: parseFloat(result.x),
          }}
          onPress={() =>
            useHandleMarkerPress({ result, setSelectedPlace, setShowModal })
          }
        >
          <View style={styles.markerContainer}>
            <View style={styles.marker}>
              <Ionicons name="location" size={24} color="#0066cc" />
            </View>
            <Text style={styles.markerTitle}>{result.place_name}</Text>
            <View style={styles.markerArrow} />
          </View>
        </Marker>
      ))}
    </>
  );
};
export default MarkerList;
