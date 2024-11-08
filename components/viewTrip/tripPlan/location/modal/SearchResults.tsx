import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { categoryMap } from "@/constants/default";
import styles from "./styles";
import { addSearchResultsProps } from "@/types/viewTrip/viewTrip";

export const SearchResults: React.FC<addSearchResultsProps> = ({
  isSearching,
  searchResults,
  onSelectPlace,
}) => {
  if (isSearching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#4A90E2" />
        <Text style={styles.loadingText}>검색중...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.searchResultsList}
      keyboardShouldPersistTaps="handled"
    >
      {searchResults.map((result, index) => (
        <TouchableOpacity
          key={`${result.id}-${index}`}
          style={styles.searchResultItem}
          onPress={() => onSelectPlace(result)}
        >
          <Text style={styles.placeName}>{result.place_name}</Text>
          <Text style={styles.addressName}>{result.address_name}</Text>
          {result.category_group_code && (
            <Text style={styles.category}>
              {categoryMap[result.category_group_code]}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
