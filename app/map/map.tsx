import { MAP_KEY } from "@/constants/api";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash/debounce";

const KAKAO_API_KEY = MAP_KEY;
const { width } = Dimensions.get("window");

export default function Maps() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 검색어 자동완성을 위한 debounce 함수
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
        )}&size=15`, // 검색 결과 수 증가
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

  const handleLocationSelect = (result) => {
    setSelectedLocation({
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
    });
    setSearchQuery(result.place_name);
    setSearchResults([]);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    zIndex: 1,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  resultsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 110 : 80,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    maxHeight: 400,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  resultsList: {
    maxHeight: 400,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastResultItem: {
    borderBottomWidth: 0,
  },
  resultIconContainer: {
    width: 30,
    alignItems: "center",
  },
  resultTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  placeName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  roadAddressText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  searchingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  searchingText: {
    marginLeft: 10,
    color: "#666",
    fontSize: 14,
  },
  map: {
    flex: 1,
  },
  currentLocationButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
    marginTop: -1,
  },
});
