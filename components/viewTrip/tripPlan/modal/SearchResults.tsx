import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";
import { SearchResultsProps } from "@/types/viewTrip/viewTrip";

export const SearchResults = ({
  show,
  isSearching,
  results,
  onSelect,
}: SearchResultsProps) => {
  if (!show) return null;

  return (
    <View style={styles.searchResultsContainer}>
      {isSearching ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <ScrollView>
          {results.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchResultItem}
              onPress={() => onSelect(result)}
            >
              <Text style={styles.placeName}>{result.place_name}</Text>
              <Text style={styles.placeAddress}>{result.address_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
