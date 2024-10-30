import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Header from "./header/header";
import styles from "./styles";
import { useMapState } from "@/reducers/useMapState";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import { useGetCurrentLocation } from "@/hooks/map/useGetCurrentLocation";
import SearchBar from "@/components/map/searchBar/searchBar";
import TimePickerModal from "@/components/map/modal/TimePickerModal";
import MarkerList from "@/components/map/markerList/MarkerList";

export default function Maps() {
  const { state, actions } = useMapState();

  useEffect(() => {
    useGetCurrentLocation({
      setCurrentLocation: actions.setCurrentLocation,
      setSelectedLocation: actions.setSelectedLocation,
      setLoading: actions.setLoading,
    });
  }, []);

  useEffect(() => {
    if (state.search.query) {
      useDebouncedSearch({
        searchQuery: state.search.query,
        setIsSearching: actions.setIsSearching,
        setSearchResults: actions.setSearchResults,
      });
    } else {
      actions.setSearchResults([]);
    }

    return () => {
      useDebouncedSearch.cancel();
    };
  }, [state.search.query]);

  useEffect(() => {
    if (state.search.results.length > 0) {
      actions.setMarkers(state.search.results);
    }
  }, [state.search.results]);

  if (state.location.loading) {
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
        searchQuery={state.search.query}
        setSearchQuery={actions.setSearchQuery}
        searchResults={state.search.results}
        setSearchResults={actions.setSearchResults}
        isSearching={state.search.isSearching}
        setSelectedLocation={actions.setSelectedLocation}
        setMarkers={actions.setMarkers}
      />
      <MapView
        style={styles.map}
        region={
          state.location.selected
            ? {
                ...state.location.selected,
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
          markers={state.search.markers}
          setSelectedPlace={actions.setSelectedPlace}
          setShowModal={actions.setShowModal}
        />
      </MapView>
      <TimePickerModal
        showModal={state.modal.showModal}
        setShowModal={actions.setShowModal}
        selectedPlace={state.modal.selectedPlace}
        setSelectedPlace={actions.setSelectedPlace}
        selectedTime={state.modal.selectedTime}
        setSelectedTime={actions.setSelectedTime}
        setShowTimePicker={actions.setShowTimePicker}
        showTimePicker={state.modal.showTimePicker}
      />
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={() =>
          useGetCurrentLocation({
            setCurrentLocation: actions.setCurrentLocation,
            setSelectedLocation: actions.setSelectedLocation,
            setLoading: actions.setLoading,
          })
        }
      >
        <Ionicons name="locate" size={24} color="#0066cc" />
      </TouchableOpacity>
    </View>
  );
}
