import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Header from "./header/header";
import styles from "./styles";
import { CurrentLocation, SearchResult, SelectedPlace } from "@/types/map/map";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import { useGetCurrentLocation } from "@/hooks/map/useGetCurrentLocation";
import SearchBar from "@/components/map/searchBar/searchBar";
import TimePickerModal from "@/components/map/modal/TimePickerModal";
import MarkerList from "@/components/map/markerList/MarkerList";

export default function Maps() {
  // 선택된 위치에 대한 마커 정보 추가
  const [markers, setMarkers] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<CurrentLocation | null>(null);
  const [, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 시간 선택 관련 상태
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    useGetCurrentLocation({
      setCurrentLocation,
      setSelectedLocation,
      setLoading,
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      useDebouncedSearch({ searchQuery, setIsSearching, setSearchResults });
    } else {
      setSearchResults([]);
    }

    return () => {
      useDebouncedSearch.cancel();
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setMarkers(searchResults);
    }
  }, [searchResults]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>위치를 확인하는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        isSearching={isSearching}
        setSelectedLocation={setSelectedLocation}
        setMarkers={setMarkers}
      />
      <MapView
        style={styles.map}
        region={
          selectedLocation
            ? {
                ...selectedLocation,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : undefined
        }
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
      >
        <MarkerList
          markers={markers}
          setSelectedPlace={setSelectedPlace}
          setShowModal={setShowModal}
        />
      </MapView>
      <TimePickerModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setShowTimePicker={setShowTimePicker}
        showTimePicker={showTimePicker}
      />
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={() =>
          useGetCurrentLocation({
            setCurrentLocation,
            setSelectedLocation,
            setLoading,
          })
        }
      >
        <Ionicons name="locate" size={24} color="#0066cc" />
      </TouchableOpacity>
    </View>
  );
}
