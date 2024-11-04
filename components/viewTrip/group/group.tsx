import { Image, Text, View } from "react-native";
import styles from "./styles";
import { groupState } from "@/types/viewTrip/viewTrip";

const Group = ({ data }: { data: groupState }) => {
  return (
    <View style={styles.content}>
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
    </View>
  );
};
export default Group;
