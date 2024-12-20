import { Image, Text, View } from "react-native";
import styles from "./styles";
import { groupState } from "@/types/viewTrip/viewTrip";
import { useEffect, useState } from "react";
import EditGroupModal from "./modal/EditModal";
import Button from "@/components/common/Button/button";
import { defaults } from "@/constants/default";
import { useRecoilState } from "recoil";
import { groupDateState } from "@/recoil/groupDateState";

const Group = ({ data }: { data: groupState }) => {
  const [dataValue, setDataValue] = useState<groupState>({} as groupState);

  const [, setDate] = useRecoilState(groupDateState);
  useEffect(() => {
    setDataValue(data);
    setDate(data.date);
  }, [data]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  return (
    <View style={styles.content}>
      <View style={styles.pencilContainer}>
        <Button
          variant="icon"
          icon={{ name: "pencil", size: 18, color: "#fff" }}
          onPress={() => setIsEditModalVisible(true)}
        />
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Image
            source={{ uri: dataValue.groupThumbnail || defaults.gt }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <Text style={styles.nickname}>{dataValue.groupName}</Text>
      <Text style={styles.day}>{dataValue.date}</Text>

      <EditGroupModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        groupData={dataValue}
        setDataValue={setDataValue}
      />
    </View>
  );
};
export default Group;
