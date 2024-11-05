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
import { categoryMap } from "@/constants/default";
export const SearchResults = ({
  show,
  isSearching,
  results,
  onSelect,
}: SearchResultsProps) => {
  if (!show) return null;

  return (
    <View style={styles.container}>
      <View style={styles.searchResultsContainer}>
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4A90E2" />
            <Text style={styles.loadingText}>검색중...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.searchResultsList}
            keyboardShouldPersistTaps="handled"
          >
            {results.map((result, index) => (
              <TouchableOpacity
                key={`${result.id}-${index}`}
                style={styles.searchResultItem}
                onPress={() => onSelect(result)}
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
        )}
      </View>
    </View>
  );
};
