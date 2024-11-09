import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import { ImagePickerSection } from "./ImagePickerSection";
import { SearchResults } from "./SearchResults";
import { FormField } from "./FormField";
import { Footer } from "./Footer";
import styles from "./styles";
import {
  AddLocationModalProps,
  AddLocationState,
  LocationItem,
} from "@/types/viewTrip/viewTrip";
import { SearchResult } from "@/types/map/map";
import { categoryMap } from "@/constants/default";
import addTripMutation from "@/hooks/api/addTripMutation";

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  visible,
  onClose,
  day,
  setLocationValue,
}) => {
  const initialLocationState: LocationItem = {
    locationId: 20,
    name: "",
    address: "",
    category: "",
    visitTime: "",
    hashtag: "",
    thumbnail: "",
  };

  const [newLocation, setNewLocation] = useState<AddLocationState>({
    groupId: 1,
    day,
    destination: "",
    locations: [initialLocationState],
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const { mutate } = addTripMutation();
  const handleSearch = (text: string) => {
    updateLocationField(currentLocationIndex, "name", text);
    if (text.length >= 2) {
      setShowSearchResults(true);
      useDebouncedSearch({
        searchQuery: text,
        setIsSearching,
        setSearchResults,
      });
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleSelectPlace = (place: SearchResult) => {
    updateLocationField(currentLocationIndex, "name", place.place_name);
    updateLocationField(currentLocationIndex, "address", place.address_name);
    updateLocationField(
      currentLocationIndex,
      "category",
      categoryMap[place.category_group_code] || "기타"
    );
    setShowSearchResults(false);
  };

  const updateLocationField = (
    index: number,
    field: keyof LocationItem,
    value: string
  ) => {
    setNewLocation((prev) => {
      const updatedLocations = [...prev.locations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        [field]: value,
      };
      return {
        ...prev,
        locations: updatedLocations,
      };
    });
  };

  const handleDestinationChange = (text: string) => {
    setNewLocation((prev) => ({
      ...prev,
      destination: text,
    }));
  };

  const addNewLocation = () => {
    setNewLocation((prev) => ({
      ...prev,
      locations: [...prev.locations, { ...initialLocationState }],
    }));
    setCurrentLocationIndex(newLocation.locations.length);
  };

  const removeLocation = (index: number) => {
    if (newLocation.locations.length > 1) {
      setNewLocation((prev) => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index),
      }));
      setCurrentLocationIndex(Math.max(0, currentLocationIndex - 1));
    }
  };

  const handleSubmit = () => {
    const currentLocation = newLocation.locations[currentLocationIndex];
    if (!currentLocation.name || !currentLocation.address) {
      alert("장소명과 주소는 필수입니다.");
      return;
    }

    // 여기에 데이터 제출 로직 추가
    console.log(newLocation);
    const locationToSet = {
      locationId: newLocation.locations[currentLocationIndex].locationId,
      name: newLocation.locations[currentLocationIndex].name,
      address: newLocation.locations[currentLocationIndex].address,
      category: newLocation.locations[currentLocationIndex].category,
      visitTime: newLocation.locations[currentLocationIndex].visitTime,
      hashtag: newLocation.locations[currentLocationIndex].hashtag,
      thumbnail: newLocation.locations[currentLocationIndex].thumbnail,
    };
    setLocationValue((prev) => ({ ...prev, locationToSet }));
    mutate({ body: newLocation });
    onClose();
    setNewLocation({
      groupId: 0,
      day,
      destination: "",
      locations: [initialLocationState],
    });
    setCurrentLocationIndex(0);
  };

  const currentLocation = newLocation.locations[currentLocationIndex];

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
              required
            />

            {/* 장소 선택 탭 */}
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

            <ImagePickerSection
              thumbnail={currentLocation.thumbnail}
              onImageSelect={(uri) =>
                updateLocationField(currentLocationIndex, "thumbnail", uri)
              }
            />

            <View style={[styles.inputGroup, { zIndex: 1 }]}>
              <Text style={styles.label}>장소명 *</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  value={currentLocation.name}
                  onChangeText={handleSearch}
                  placeholder="장소명을 입력하세요"
                />
                {showSearchResults && (
                  <View style={styles.searchResultsContainer}>
                    <SearchResults
                      isSearching={isSearching}
                      searchResults={searchResults}
                      onSelectPlace={handleSelectPlace}
                    />
                  </View>
                )}
              </View>
            </View>

            <FormField
              label="주소"
              value={currentLocation.address}
              onChangeText={(text) =>
                updateLocationField(currentLocationIndex, "address", text)
              }
              placeholder="주소를 입력하세요"
              required
              editable={false}
            />

            <FormField
              label="카테고리"
              value={currentLocation.category}
              onChangeText={(text) =>
                updateLocationField(currentLocationIndex, "category", text)
              }
              placeholder="카테고리를 입력하세요"
            />

            <FormField
              label="방문 예정 시간"
              value={currentLocation.visitTime}
              onChangeText={(text) =>
                updateLocationField(currentLocationIndex, "visitTime", text)
              }
              placeholder="예: 1시간"
            />

            <FormField
              label="해시태그"
              value={currentLocation.hashtag}
              onChangeText={(text) =>
                updateLocationField(currentLocationIndex, "hashtag", text)
              }
              placeholder="#태그1 #태그2"
            />

            {newLocation.locations.length > 1 && (
              <TouchableOpacity
                style={styles.removeLocationButton}
                onPress={() => removeLocation(currentLocationIndex)}
              >
                <Text style={styles.removeLocationText}>현재 장소 삭제</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <Footer onCancel={onClose} onSubmit={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default AddLocationModal;
