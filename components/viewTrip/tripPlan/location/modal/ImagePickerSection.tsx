import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import { AddImagePickerSectionProps } from "@/types/viewTrip/viewTrip";
import uploadNewLocationThumbnail from "@/api/trip/uploadNewLocationThumbnail";

export const ImagePickerSection: React.FC<AddImagePickerSectionProps> = ({
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
      await uploadThumbnail(result.assets[0].uri);
    }
  };

  const uploadThumbnail = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", {
        uri: imageUri,
        type: "image/jpeg",
        name: "thumbnail.jpg",
      } as any);

      const response = await uploadNewLocationThumbnail(formData);

      onImageSelect(response.thumbnailUrl);

      alert(response.message);
    } catch (error) {
      console.error("섭네일 업로드 에러:", error);
      alert("썸네일 업로드 실패");
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
