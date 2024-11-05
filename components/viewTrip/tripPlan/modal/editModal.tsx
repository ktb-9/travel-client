import React, { useState } from "react";
import { Modal, View, ScrollView } from "react-native";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import styles from "./styles";
import { SearchResult } from "@/types/map/map";
import { categoryMap } from "@/constants/default";
import { SearchResults } from "./SearchResults";
import { FormField } from "./FormField";
import { ModalHeader } from "./ModalHeader";
import { useLocationForm } from "@/hooks/viewTrip/useLocationForm";
import { EditModalProps } from "@/types/viewTrip/viewTrip";

const EditModal = ({ visible, onClose, location, day }: EditModalProps) => {
  const { formData, setFormData, handleSubmit } = useLocationForm(
    location,
    day,
    onClose
  );
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

  const handleSelectPlace = (place: SearchResult) => {
    setFormData((prev) => ({
      ...prev,
      name: place.place_name,
      address: place.address_name,
      category: categoryMap[place.category_group_code],
    }));
    setShowSearchResults(false);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ModalHeader
          onClose={onClose}
          onSave={handleSubmit}
          title="Edit Location"
        />

        <ScrollView style={styles.content}>
          <FormField
            label="Name"
            value={formData.name}
            onChangeText={handleSearch}
            placeholder="장소를 검색해주세요..."
          >
            <SearchResults
              show={showSearchResults}
              isSearching={isSearching}
              results={searchResults}
              onSelect={handleSelectPlace}
            />
          </FormField>

          <FormField
            label="Address"
            value={formData.address}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, address: text }))
            }
            placeholder="Enter address"
          />

          <FormField
            label="Visit Time"
            value={formData.visitTime}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, visitTime: text }))
            }
            placeholder="방문 시간을 입력해주세요..."
          />

          <FormField
            label="Category"
            value={formData.category}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, category: text }))
            }
            placeholder="카테고리를 선택해주세요..."
          />

          <FormField
            label="Hashtag"
            value={formData.hashtag}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, hashtag: text }))
            }
            placeholder="테그를 입력해주세요..."
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditModal;