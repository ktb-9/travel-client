import { MAP_KEY } from "@/constants/api";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import debounce from "lodash/debounce";
import Header from "./header/header";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { tripPlanState } from "@/recoil/tripPlanState";

interface SearchResult {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string;
  y: string;
}

interface CurrentLocation {
  latitude: number;
  longitude: number;
}

const KAKAO_API_KEY = MAP_KEY;

export default function Maps() {
  const router = useRouter();
  const { day } = useLocalSearchParams<{ day: string }>();
  const [, setTripPlan] = useRecoilState(tripPlanState);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<CurrentLocation | null>(null);
  const [, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

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

  const handleLocationSelect = (result: SearchResult) => {
    // 선택된 위치로 지도 이동
    setSelectedLocation({
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
    });
    setSearchQuery(result.place_name);
    setSearchResults([]);

    // tripPlanState에 위치 추가
    const currentDay = parseInt(day);
    const location = {
      name: result.place_name,
      address: result.road_address_name || result.address_name,
      coordinates: {
        latitude: parseFloat(result.y),
        longitude: parseFloat(result.x),
      },
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

    // 위치 선택 후 이전 화면으로 자동 이동 (선택적)
    router.back();
  };

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
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Ionicons name="location" size={24} color="#0066cc" />
              </View>
              <View style={styles.markerArrow} />
            </View>
          </Marker>
        )}
      </MapView>

      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={getCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="#0066cc" />
      </TouchableOpacity>
    </View>
  );
}
