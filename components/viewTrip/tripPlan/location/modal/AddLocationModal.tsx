import React, { useRef, useState } from "react";
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
import MapView from "react-native-maps";
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
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import { MAP_KEY } from "@/constants/api";
import MarkerList from "./markerList";

const KAKAO_API_KEY = MAP_KEY;

// 리버스 지오코딩 함수
const useReverseGeocode = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      const addressDocument = data.documents[0];
      return {
        place_name:
          addressDocument.road_address?.building_name ||
          addressDocument.address.address_name,
        address_name: addressDocument.address.address_name,
        x: longitude.toString(),
        y: latitude.toString(),
        category_group_code: addressDocument.category_group_code || "",
      };
    }
    return null;
  } catch (error) {
    console.error("리버스 지오코딩 중 오류 발생:", error);
    return null;
  }
};

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  visible,
  onClose,
  day,
}) => {
  const initialLocationState: LocationItem = {
    name: "",
    address: "",
    category: "",
    visit_time: "",
    hashtag: "",
    thumbnail: "",
  };

  const [mapSearchQuery, setMapSearchQuery] = useState("");
  const [mapSearchResults, setMapSearchResults] = useState<SearchResult[]>([]);
  const [mapMarkers, setMapMarkers] = useState<SearchResult[]>([]);
  const tripId = useRecoilValue(tripIdState);
  const [newLocation, setNewLocation] = useState<AddLocationState>({
    tripId,
    day,
    destination: "",
    locations: [initialLocationState],
  });

  const mapViewRef = useRef<MapView>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const { mutate } = addTripMutation(tripId);

  // 지도 선택 모드 상태 추가
  const [isMapSelectionMode, setIsMapSelectionMode] = useState(false);

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

  // 지도 선택 모드 토글
  const toggleMapSelectionMode = () => {
    setIsMapSelectionMode(!isMapSelectionMode);
  };

  const handleMapLocationSelect = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // 현재 마커 목록에서 클릭한 위치와 가장 가까운 마커 찾기
    const closestMarker = mapMarkers.reduce((closest: any, marker: any) => {
      const markerLat = parseFloat(marker.y);
      const markerLng = parseFloat(marker.x);
      const distance = Math.sqrt(
        Math.pow(markerLat - latitude, 2) + Math.pow(markerLng - longitude, 2)
      );

      return distance < (closest?.distance || Infinity)
        ? { marker, distance }
        : closest;
    }, null);

    if (closestMarker) {
      // 가장 가까운 마커의 정보로 location 업데이트
      updateLocationField(
        currentLocationIndex,
        "name",
        closestMarker.marker.place_name
      );
      updateLocationField(
        currentLocationIndex,
        "address",
        closestMarker.marker.address_name
      );
      updateLocationField(
        currentLocationIndex,
        "category",
        categoryMap[closestMarker.marker.category_group_code] || "기타"
      );

      // 지도 선택 모드 종료
      setIsMapSelectionMode(false);
    } else {
      // 검색 결과 마커가 없는 경우 기존 리버스 지오코딩 로직 사용
      const reverseGeocode = async () => {
        const locationInfo = await useReverseGeocode(latitude, longitude);
        if (locationInfo) {
          updateLocationField(
            currentLocationIndex,
            "name",
            locationInfo.place_name
          );
          updateLocationField(
            currentLocationIndex,
            "address",
            locationInfo.address_name
          );
          updateLocationField(
            currentLocationIndex,
            "category",
            categoryMap[locationInfo.category_group_code] || "기타"
          );

          setIsMapSelectionMode(false);
        }
      };
      reverseGeocode();
    }
  };
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

  const currentLocation = newLocation.locations[currentLocationIndex];

  const handleMapSearch = (text: string) => {
    setMapSearchQuery(text);
    if (text.length >= 2) {
      useDebouncedSearch({
        searchQuery: text,
        setIsSearching,
        setSearchResults: setMapSearchResults,
        setMapMarkers: setMapMarkers,
      });
    } else {
      setMapSearchResults([]);
      setMapMarkers([]);
    }
  };

  const handleMapSearchResultSelect = (result: SearchResult) => {
    // 선택된 장소로 MapView의 region 이동
    mapViewRef.current?.animateToRegion({
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    // 검색 결과 마커 추가
    setMapMarkers([result]);

    // 검색 결과 초기화
    setMapSearchQuery("");
    setMapSearchResults([]);
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

            {/* 지도로 선택 버튼 추가 */}
            <TouchableOpacity
              style={styles.mapSelectButton}
              onPress={toggleMapSelectionMode}
            >
              <Text style={styles.mapSelectButtonText}>지도로 장소 선택</Text>
            </TouchableOpacity>

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
              value={currentLocation.visit_time}
              onChangeText={(text) =>
                updateLocationField(currentLocationIndex, "visit_time", text)
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

      {/* 지도 선택 모드일 때 전체 화면 MapView */}
      {isMapSelectionMode && (
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

            <TouchableOpacity
              style={styles.closeMapButton}
              onPress={toggleMapSelectionMode}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </Modal>
  );
};
export default AddLocationModal;
