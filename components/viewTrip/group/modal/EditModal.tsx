import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { groupState } from "@/types/viewTrip/viewTrip";
import styles from "./styles";
import tripGroupUpdateMutation from "@/hooks/api/tripGroupUpdateMutation";
import uploadGroupThumbnail from "@/api/group/uploadGroupThumbnail";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
interface EditGroupModalProps {
  isVisible: boolean;
  onClose: () => void;
  groupData: groupState;
  setDataValue: React.Dispatch<React.SetStateAction<groupState>>;
}

const EditGroupModal = ({
  isVisible,
  onClose,
  groupData,
  setDataValue,
}: EditGroupModalProps) => {
  const [groupName, setGroupName] = useState("");
  const [date, setDate] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const tripId = useRecoilValue(tripIdState);
  useEffect(() => {
    setGroupName(groupData.groupName || "");
    setDate(groupData.date);
    setThumbnail(groupData.groupThumbnail);
  }, [groupData]);
  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("사진 라이브러리 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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

      const response = await uploadGroupThumbnail(formData, groupData.group_id);

      setThumbnail(response.thumbnailUrl);

      alert(response.message);
    } catch (error) {
      console.error("섭네일 업로드 에러:", error);
      alert("썸네일 업로드 실패");
    }
  };

  const handleSave = () => {
    const data = { ...groupData, groupName, date, groupThumbnail: thumbnail };

    setDataValue(data);
    mutate({ tripId: tripId, body: data });
    onClose();
  };
  const { mutate } = tripGroupUpdateMutation(tripId);
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>그룹 정보 수정</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePick}
          >
            {thumbnail ? (
              <Image
                source={{ uri: thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Ionicons name="camera" size={40} color="#666" />
                <Text style={styles.placeholderText}>사진 선택</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>그룹명</Text>
            <TextInput
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
              placeholder="그룹명을 입력하세요"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>날짜</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="날짜를 입력하세요"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditGroupModal;
