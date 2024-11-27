import React, { useState } from "react";
import { Modal, View, ScrollView } from "react-native";
import { useDebouncedSearch } from "@/hooks/map/useDebounceSearch";
import styles from "./styles";
import { SearchResult } from "@/types/map/map";
import { SearchResults } from "./SearchResults/SearchResults";
import { FormField } from "../../../common/FormField/FormField";
import { ModalHeader } from "./ModalHeader";
import { useLocationForm } from "@/hooks/viewTrip/useLocationForm";
import { EditModalProps } from "@/types/viewTrip/viewTrip";
import { ImagePickerSection } from "./ImagePickerSection";
import { useEditSerachPlace } from "@/hooks/viewTrip/useEditSearchPlace";
import FormGroup from "./FormGroup/FormGroup";

const EditModal = ({
  visible,
  onClose,
  location,
  setLocationValue,
}: EditModalProps) => {
  const { formData, setFormData, handleSubmit } = useLocationForm(
    location,
    onClose,
    setLocationValue
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { handleSearch, handleSelectPlace } = useEditSerachPlace({
    setFormData,
    setShowSearchResults,
    useDebouncedSearch,
    setSearchResults,
    setIsSearching,
  });
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ModalHeader
          onClose={onClose}
          onSave={handleSubmit}
          title="장소 수정"
        />

        <ScrollView style={styles.content}>
          <FormGroup
            formData={formData}
            setFormData={setFormData}
            handleSearch={handleSearch}
            showSearchResults={showSearchResults}
            isSearching={isSearching}
            searchResults={searchResults}
            handleSelectPlace={handleSelectPlace}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditModal;
