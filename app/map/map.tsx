import { MAP_KEY } from "@/constants/api";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import debounce from "lodash/debounce";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "./header/header";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { tripPlanState } from "@/recoil/tripPlanState";
import { CurrentLocation, SearchResult, SelectedPlace } from "@/types/map/map";

const KAKAO_API_KEY = MAP_KEY;

export default function Maps() {
  const router = useRouter();
  const { day } = useLocalSearchParams<{ day: string }>();
  const [, setTripPlan] = useRecoilState(tripPlanState);

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
    getCurrentLocation();
  }, []);

  const debouncedSearch = debounce(async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          query
        )}&size=15`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        }
      );

      const data = await response.json();
      if (data.documents) {
        setSearchResults(data.documents);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("위치 권한이 거부되었습니다");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCurrentLocation({ latitude, longitude });
      setSelectedLocation({ latitude, longitude });
      setLoading(false);
    } catch (error) {
      console.error("현재 위치를 가져오는 중 오류 발생:", error);
      setLoading(false);
    }
  };

  const handleMarkerPress = (result: SearchResult) => {
    setSelectedPlace({
      name: result.place_name,
      address: result.road_address_name || result.address_name,
      coordinates: {
        latitude: parseFloat(result.y),
        longitude: parseFloat(result.x),
      },
    });
    setShowModal(true);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const handleTimeConfirm = () => {
    if (!selectedPlace) return;

    const currentDay = parseInt(day);
    const formattedTime = selectedTime.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const location = {
      name: selectedPlace.name,
      address: selectedPlace.address,
      visitTime: formattedTime, // 시간만 저장 (예: "14:30")
    };

    setTripPlan((prev) => ({
      ...prev,
      days: prev.days.map((d) =>
        d.day === currentDay
          ? {
              ...d,
              locations: [...d.locations, location],
            }
          : d
      ),
    }));

    setShowModal(false);
    setSelectedPlace(null);
    router.back();
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      setMarkers(searchResults);
    }
  }, [searchResults]);

  const handleLocationSelect = (result: SearchResult) => {
    setSelectedLocation({
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
    });
    // 선택된 위치를 마커 목록에 추가
    setMarkers([result]);
    setSearchResults([]);
    setSearchQuery("");
  };

  const TimePickerModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>
          <Text style={styles.modalAddress}>{selectedPlace?.address}</Text>

          <Text style={styles.modalSubtitle}>방문 시간 설정</Text>

          {Platform.OS === "ios" ? (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              locale="ko-KR"
            />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.androidTimeButton}
              >
                <Text style={styles.androidTimeButtonText}>
                  {selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleTimeChange}
                  locale="ko-KR"
                />
              )}
            </>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonTextCancel}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={handleTimeConfirm}
            >
              <Text style={styles.modalButtonTextConfirm}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="위치를 검색하세요"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          {isSearching ? (
            <View style={styles.searchingContainer}>
              <ActivityIndicator size="small" color="#0066cc" />
              <Text style={styles.searchingText}>검색중...</Text>
            </View>
          ) : (
            <ScrollView style={styles.resultsList}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  key={`${result.id}-${index}`}
                  style={[
                    styles.resultItem,
                    index === searchResults.length - 1 && styles.lastResultItem,
                  ]}
                  onPress={() => handleLocationSelect(result)}
                >
                  <View style={styles.resultIconContainer}>
                    <Ionicons name="location" size={20} color="#0066cc" />
                  </View>
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.placeName}>{result.place_name}</Text>
                    <Text style={styles.addressText}>
                      {result.address_name}
                    </Text>
                    {result.road_address_name && (
                      <Text style={styles.roadAddressText}>
                        {result.road_address_name}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}

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
        {markers.map((result, index) => (
          <Marker
            key={`${result.id}-${index}`}
            coordinate={{
              latitude: parseFloat(result.y),
              longitude: parseFloat(result.x),
            }}
            onPress={() => handleMarkerPress(result)}
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
      </MapView>

      <TimePickerModal />

      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={getCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="#0066cc" />
      </TouchableOpacity>
    </View>
  );
}
