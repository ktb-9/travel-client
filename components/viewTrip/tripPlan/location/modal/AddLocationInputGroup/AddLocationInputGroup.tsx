import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ImagePickerSection } from "../ImagePickerSection";
import { SearchResults } from "../SearchResults";

import { AddLocationInputGroupState } from "@/types/map/map";
import styles from "./styles";
import Button from "@/components/common/Button/button";
import { FormField } from "@/components/common/FormField/FormField";

const AddLocationInputGroup = ({
  currentLocation,
  updateLocationField,
  currentLocationIndex,
  handleSearch,
  showSearchResults,
  isSearching,
  searchResults,
  handleSelectPlace,
  toggleMapSelectionMode,
  newLocation,
  removeLocation,
}: AddLocationInputGroupState) => {
  return (
    <>
      <ImagePickerSection
        thumbnail={currentLocation.thumbnail}
        onImageSelect={(uri) =>
          updateLocationField(currentLocationIndex, "thumbnail", uri)
        }
      />
      <View style={[styles.inputGroup, { zIndex: 2 }]}>
        <Text style={styles.label}>장소명 *</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={currentLocation.name}
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

      {/* 지도로 선택 버튼 추가 */}
      <Button
        title="지도로 장소 선택 "
        onPress={toggleMapSelectionMode}
        style={styles.mapSelectButton}
      />

      <FormField
        label="주소"
        value={currentLocation.address}
        onChangeText={(text) =>
          updateLocationField(currentLocationIndex, "address", text)
        }
        placeholder="주소를 입력하세요"
      />

      <FormField
        label="카테고리"
        value={currentLocation.category}
        onChangeText={(text) =>
          updateLocationField(currentLocationIndex, "category", text)
        }
        placeholder="카테고리를 입력하세요"
      />

      <FormField
        label="방문 예정 시간"
        value={currentLocation.visit_time}
        onChangeText={(text) =>
          updateLocationField(currentLocationIndex, "visit_time", text)
        }
        placeholder="예: 1시간"
      />

      <FormField
        label="해시태그"
        value={currentLocation.hashtag}
        onChangeText={(text) =>
          updateLocationField(currentLocationIndex, "hashtag", text)
        }
        placeholder="#태그1 #태그2"
      />

      {newLocation.locations.length > 1 && (
        <TouchableOpacity
          style={styles.removeLocationButton}
          onPress={() => removeLocation(currentLocationIndex)}
        >
          <Text style={styles.removeLocationText}>현재 장소 삭제</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
export default AddLocationInputGroup;
