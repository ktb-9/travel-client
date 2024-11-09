import styles from "@/app/map/styles";
import { useHandleLocationSelect } from "@/hooks/map/useHandleLocationSelect";
import { SearchBarProps } from "@/types/map/map";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
  isSearching,
  setSelectedLocation,
  setMarkers,
}: SearchBarProps) => {
  return (
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
                  onPress={() =>
                    useHandleLocationSelect({
                      result,
                      setSelectedLocation,
                      setMarkers,
                      setSearchResults,
                      setSearchQuery,
                    })
                  }
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
    </View>
  );
};
export default SearchBar;
