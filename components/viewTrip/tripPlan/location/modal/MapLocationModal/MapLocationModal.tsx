import { MapLocationSearchProps, SearchResult } from "@/types/map/map";
import { useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import MarkerList from "../markerList";
import { useMapLocation } from "@/hooks/map/useMapLocation";
import styles from "./styles";
import Button from "@/components/common/Button/button";

const MapLocactionModal = ({
  isMapSelectionMode,
  toggleMapSelectionMode,
  setIsMapSelectionMode,
  updateLocationField,
  currentLocationIndex,
  setIsSearching,
}: MapLocationSearchProps) => {
  const mapViewRef = useRef<MapView>(null);
  const [mapSearchQuery, setMapSearchQuery] = useState("");
  const [mapSearchResults, setMapSearchResults] = useState<SearchResult[]>([]);
  const [mapMarkers, setMapMarkers] = useState<SearchResult[]>([]);
  const {
    handleMapLocationSelect,
    handleMapSearch,
    handleMapSearchResultSelect,
  } = useMapLocation({
    mapMarkers,
    mapViewRef,
    updateLocationField,
    currentLocationIndex,
    setIsMapSelectionMode,
    setMapSearchQuery,
    setIsSearching,
    setMapSearchResults,
    setMapMarkers,
  });
  return (
    <Modal
      visible={isMapSelectionMode}
      animationType="slide"
      transparent={false}
    >
      <View style={{ flex: 1 }}>
        {/* 검색 input 추가 */}
        <View style={styles.mapSearchContainer}>
          <TextInput
            style={styles.mapSearchInput}
            placeholder="장소를 검색하세요"
            value={mapSearchQuery}
            onChangeText={handleMapSearch}
          />
          {mapSearchResults.length > 0 && (
            <ScrollView style={styles.mapSearchResultsContainer}>
              {mapSearchResults.map((result) => (
                <TouchableOpacity
                  key={result.id}
                  style={styles.mapSearchResultItem}
                  onPress={() => handleMapSearchResultSelect(result)}
                >
                  <Text style={styles.mapSearchResultText}>
                    {result.place_name}
                  </Text>
                  <Text style={styles.mapSearchResultSubtext}>
                    {result.address_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.5665, // 서울 기본 위치
            longitude: 126.978,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onPress={handleMapLocationSelect}
        >
          <MarkerList
            markers={mapMarkers}
            onMarkerPress={handleMapSearchResultSelect}
          />
        </MapView>
        <Button
          title="취소"
          style={styles.closeMapButton}
          onPress={toggleMapSelectionMode}
        />
      </View>
    </Modal>
  );
};
export default MapLocactionModal;
