import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import uploadGroupBackgroud_URL from "@/api/group/uploadGroupBackground_URL";
import { BackgroundSelectionModalProps } from "@/types/viewTrip/viewTrip";

export const BackgroundSelectionModal: React.FC<
  BackgroundSelectionModalProps
> = ({ visible, onClose, onSelectBackground, groupId }) => {
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

      const response = await uploadGroupBackgroud_URL(formData, groupId);

      onSelectBackground(response.thumbnailUrl);
      alert(response.message);
      onClose();
    } catch (error) {
      console.error("섭네일 업로드 에러:", error);
      alert("썸네일 업로드 실패");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>배경 선택</Text>
          <TouchableOpacity
            style={styles.customBackgroundButton}
            onPress={handleImagePicker}
          >
            <MaterialIcons name="add-photo-alternate" size={24} color="black" />
            <Text style={styles.customBackgroundButtonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BackgroundSelectionModal;
