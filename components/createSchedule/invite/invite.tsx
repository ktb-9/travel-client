import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import shin from "@/assets/images/shin.png";
const data = [
  {
    id: 1,
    name: "신짱구",
    lead: true,
    image: shin,
  },
  {
    id: 2,
    name: "김철수",
    lead: false,
    image: shin,
  },
];
const Invite = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.addCompanion}>
          <Text style={styles.buttonText}>동행인 추가</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.invitedWrapper}>
        <ScrollView contentContainerStyle={styles.listWrapper}>
          <View style={styles.listItem}></View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Invite;
