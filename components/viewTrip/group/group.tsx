import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { groupState } from "@/types/viewTrip/viewTrip";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import EditGroupModal from "./modal/EditModal";

const Group = ({ data }: { data: groupState }) => {
  const handleSave = (updatedData: groupState) => {
    console.log(updatedData);
  };

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  return (
    <View style={styles.content}>
      <View style={styles.pencilContainer}>
        <TouchableOpacity onPress={() => setIsEditModalVisible(true)}>
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Image
            source={data.groupThumbnail || ""}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <Text style={styles.nickname}>{data.groupName}</Text>
      <Text style={styles.day}>{data.date}</Text>
      <EditGroupModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        groupData={data}
        onSave={handleSave}
      />
    </View>
  );
};
export default Group;
