import { FormField } from "@/components/common/FormField/FormField";
import { ImagePickerSection } from "../ImagePickerSection";
import { View } from "react-native";
import { SearchResults } from "../SearchResults/SearchResults";
import { FormGroupProps } from "@/types/map/map";
import styles from "./styles";

const FormGroup = ({
  formData,
  setFormData,
  handleSearch,
  showSearchResults,
  isSearching,
  searchResults,
  handleSelectPlace,
}: FormGroupProps) => {
  return (
    <>
      <ImagePickerSection
        thumbnail={formData.thumbnail}
        onImageSelect={(uri) =>
          setFormData((prev) => ({ ...prev, thumbnail: uri }))
        }
      />
      <View style={styles.searchInputGroup}>
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
      </View>

      <View style={styles.inputGroup}>
        <FormField
          label="Address"
          value={formData.address}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, address: text }))
          }
          placeholder="Enter address"
        />
      </View>

      <View style={styles.inputGroup}>
        <FormField
          label="Visit Time"
          value={formData.visit_time}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, visitTime: text }))
          }
          placeholder="방문 시간을 입력해주세요..."
        />
      </View>

      <View style={styles.inputGroup}>
        <FormField
          label="Category"
          value={formData.category}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, category: text }))
          }
          placeholder="카테고리를 선택해주세요..."
        />
      </View>

      <View style={styles.inputGroup}>
        <FormField
          label="Hashtag"
          value={formData.hashtag}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, hashtag: text }))
          }
          placeholder="테그를 입력해주세요..."
        />
      </View>
    </>
  );
};
export default FormGroup;
