import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import { ImagePickerSectionProps } from "@/types/viewTrip/viewTrip";

export const ImagePickerSection: React.FC<ImagePickerSectionProps> = ({
  thumbnail,
  onImageSelect,
}) => {
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={styles.imagePickerContainer}
      onPress={handleImagePicker}
    >
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <MaterialIcons name="add-photo-alternate" size={40} color="#666" />
          <Text style={styles.imagePlaceholderText}>사진 추가</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
