import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import { Footer } from "./Footer";
import styles from "./styles";
import {
  AddLocationModalProps,
  AddLocationState,
} from "@/types/viewTrip/viewTrip";
import { SearchResult } from "@/types/map/map";
import { initialLocationState } from "@/constants/default";
import addTripMutation from "@/hooks/api/addTripMutation";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import { useLocation } from "@/hooks/map/useLocation";
import MapLocactionModal from "./MapLocationModal/MapLocationModal";
import AddLocationInputGroup from "./AddLocationInputGroup/AddLocationInputGroup";
import LocationTabs from "./LocationTabs/LocationTabs";
import { FormField } from "@/components/common/FormField/FormField";

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  visible,
  onClose,
  day,
}) => {
  // 지도 선택 모드 상태 추가
  const [isMapSelectionMode, setIsMapSelectionMode] = useState(false);
  const tripId = useRecoilValue(tripIdState);
  const toggleMapSelectionMode = () => {
    setIsMapSelectionMode(!isMapSelectionMode);
  };

  const [newLocation, setNewLocation] = useState<AddLocationState>({
    tripId,
    day,
    destination: "",
    locations: [initialLocationState],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const { mutate } = addTripMutation(tripId);
  const currentLocation = newLocation.locations[currentLocationIndex];

  const {
    handleSearch,
    handleSelectPlace,
    updateLocationField,
    handleDestinationChange,
    addNewLocation,
    removeLocation,
  } = useLocation({
    currentLocationIndex,
    setShowSearchResults,
    useDebouncedSearch,
    setIsSearching,
    setSearchResults,
    setNewLocation,
    setCurrentLocationIndex,
    newLocation,
  });

  const handleSubmit = () => {
    const currentLocation = newLocation.locations[currentLocationIndex];
    if (!currentLocation.name || !currentLocation.address) {
      alert("장소명과 주소는 필수입니다.");
      return;
    }
    console.log(newLocation);
    mutate({ body: newLocation });
    onClose();
    setNewLocation({
      tripId,
      day,
      destination: "",
      locations: [initialLocationState],
    });
    setCurrentLocationIndex(0);
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>새로운 장소 추가</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <FormField
              label="목적지"
              value={newLocation.destination}
              onChangeText={handleDestinationChange}
              placeholder="목적지를 입력하세요"
            />

            {/* 장소 선택 탭 */}
            <LocationTabs
              newLocation={newLocation}
              currentLocationIndex={currentLocationIndex}
              setCurrentLocationIndex={setCurrentLocationIndex}
              addNewLocation={addNewLocation}
            />

            <AddLocationInputGroup
              currentLocation={currentLocation}
              updateLocationField={updateLocationField}
              currentLocationIndex={currentLocationIndex}
              handleSearch={handleSearch}
              showSearchResults={showSearchResults}
              isSearching={isSearching}
              searchResults={searchResults}
              handleSelectPlace={handleSelectPlace}
              toggleMapSelectionMode={toggleMapSelectionMode}
              newLocation={newLocation}
              removeLocation={removeLocation}
            />
          </ScrollView>

          <Footer onCancel={onClose} onSubmit={handleSubmit} />
        </View>
      </KeyboardAvoidingView>

      {/* 지도 선택 모드일 때 전체 화면 MapView */}
      {isMapSelectionMode && (
        <MapLocactionModal
          isMapSelectionMode={isMapSelectionMode}
          toggleMapSelectionMode={toggleMapSelectionMode}
          setIsMapSelectionMode={setIsMapSelectionMode}
          updateLocationField={updateLocationField}
          currentLocationIndex={currentLocationIndex}
          setIsSearching={setIsSearching}
        />
      )}
    </Modal>
  );
};
export default AddLocationModal;
