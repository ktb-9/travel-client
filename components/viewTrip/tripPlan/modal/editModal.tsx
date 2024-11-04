import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import { SearchResult } from "@/types/map/map";
import styles from "./styles";

const EditModal = ({ visible, onClose, location, onSave }: any) => {
  const [formData, setFormData] = useState({
    name: location?.name || "",
    address: location?.address || "",
    visitTime: location?.visitTime || "",
    category: location?.category || "",
    hashtags: location?.hastag?.replace(/#/g, "").trim() || "",
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (text: string) => {
    setFormData((prev) => ({ ...prev, name: text }));
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

  const handleSelectPlace = (place: any) => {
    setFormData((prev) => ({
      ...prev,
      name: place.place_name,
      address: place.address_name,
      category: categoryMap[place.category_group_code],
    }));
    setShowSearchResults(false);
  };

  const categoryMap: { [key: string]: string } = {
    MT1: "대형마트",
    CS2: "편의점",
    PS3: "어린이집, 유치원",
    SC4: "학교",
    AC5: "학원",
    PK6: "주차장",
    OL7: "주유소, 충전소",
    SW8: "지하철역",
    BK9: "은행",
    CT1: "문화시설",
    AG2: "중개업소",
    PO3: "공공기관",
    AT4: "관광지",
    AD5: "숙박",
    FD6: "식당",
    CE7: "카페",
    HP8: "병원",
    PM9: "약국",
  };

  const handleSubmit = () => {
    const formattedHashtags = formData.hashtags
      .split(" ")
      .filter((tag: string) => tag)
      .map((tag: string) => `#${tag}`)
      .join(" ");

    onSave({
      ...location,
      ...formData,
      hastag: formattedHashtags,
    });
    onClose();
  };

  const renderSearchResults = () => {
    if (!showSearchResults) return null;

    return (
      <View style={styles.searchResultsContainer}>
        {isSearching ? (
          <ActivityIndicator style={styles.loadingIndicator} />
        ) : (
          <ScrollView>
            {searchResults.map((result: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.searchResultItem}
                onPress={() => handleSelectPlace(result)}
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

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Location</Text>
          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={handleSearch}
              placeholder="Search location name"
            />
            {renderSearchResults()}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, address: text }))
              }
              placeholder="Enter address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Visit Time</Text>
            <TextInput
              style={styles.input}
              value={formData.visitTime}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, visitTime: text }))
              }
              placeholder="Enter visit time"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryPicker}>
              <Text style={styles.categoryPickerText}>{formData.category}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hashtags</Text>
            <TextInput
              style={styles.input}
              value={formData.hashtags}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, hashtags: text }))
              }
              placeholder="Enter tags separated by spaces"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditModal;
