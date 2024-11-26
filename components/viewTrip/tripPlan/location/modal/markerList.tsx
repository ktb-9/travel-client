import React from "react";
import { Marker } from "react-native-maps";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SearchResult } from "@/types/map/map";
import styles from "./styles";

interface MarkerListProps {
  markers: SearchResult[];
  onMarkerPress?: (result: SearchResult) => void;
}

const MarkerList: React.FC<MarkerListProps> = ({ markers, onMarkerPress }) => {
  return (
    <>
      {markers.map((result, index) => (
        <Marker
          key={`${result.id}-${index}`}
          coordinate={{
            latitude: parseFloat(result.y),
            longitude: parseFloat(result.x),
          }}
          onPress={() => onMarkerPress && onMarkerPress(result)}
          title={result.place_name}
          description={result.address_name}
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
