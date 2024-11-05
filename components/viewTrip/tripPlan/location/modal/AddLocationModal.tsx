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
} from "@/types/viewTrip/viewTrip";
import { SearchResult } from "@/types/map/map";
import { categoryMap } from "@/constants/default";

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  visible,
  onClose,
}) => {
  const [newLocation, setNewLocation] = useState<Partial<AddLocationState>>({
    name: "",
    address: "",
    category: "",
    visitTime: "",
    hashtag: "",
    thumbnail: "",
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (text: string) => {
    setNewLocation((prev) => ({ ...prev, name: text }));
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
    setNewLocation((prev) => ({
      ...prev,
      name: place.place_name,
      address: place.address_name,
      category: categoryMap[place.category_group_code] || "기타",
    }));
    setShowSearchResults(false);
  };

  const handleSubmit = () => {
    if (!newLocation.name || !newLocation.address) {
      alert("장소명과 주소는 필수입니다.");
      return;
    }

    const locationData: AddLocationState = {
      name: newLocation.name!,
      address: newLocation.address!,
      category: newLocation.category || "기타",
      visitTime: newLocation.visitTime || "1시간",
      hashtag: newLocation.hashtag || "",
      thumbnail: newLocation.thumbnail || "https://via.placeholder.com/300x200",
    };

    onClose();
    setNewLocation({
      name: "",
      address: "",
      category: "",
      visitTime: "",
      hashtag: "",
      thumbnail: "",
    });
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
            <ImagePickerSection
              thumbnail={newLocation.thumbnail || ""}
              onImageSelect={(uri) =>
                setNewLocation((prev) => ({ ...prev, thumbnail: uri }))
              }
            />

            <View style={[styles.inputGroup, { zIndex: 1 }]}>
              <Text style={styles.label}>장소명 *</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  value={newLocation.name}
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
              value={newLocation.address || ""}
              onChangeText={(text) =>
                setNewLocation((prev) => ({ ...prev, address: text }))
              }
              placeholder="주소를 입력하세요"
              required
              editable={false}
            />

            <FormField
              label="카테고리"
              value={newLocation.category || ""}
              onChangeText={(text) =>
                setNewLocation((prev) => ({ ...prev, category: text }))
              }
              placeholder="카테고리를 입력하세요"
            />

            <FormField
              label="방문 예정 시간"
              value={newLocation.visitTime || ""}
              onChangeText={(text) =>
                setNewLocation((prev) => ({ ...prev, visitTime: text }))
              }
              placeholder="예: 1시간"
            />

            <FormField
              label="해시태그"
              value={newLocation.hashtag || ""}
              onChangeText={(text) =>
                setNewLocation((prev) => ({ ...prev, hashtag: text }))
              }
              placeholder="#태그1 #태그2"
            />
          </ScrollView>

          <Footer onCancel={onClose} onSubmit={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddLocationModal;
