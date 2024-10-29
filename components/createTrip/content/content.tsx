import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useRecoilValue } from "recoil";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import { useFonts } from "expo-font";
import Plan from "../plan/plan";
const Content = () => {
  const groupInfo = useRecoilValue(createSchdeuleState);
  const [fontsLoaded] = useFonts({
    NotoSans: require("@/assets/fonts/NotoSansKR-Medium.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.groupNameWrapper}>
          <Text style={styles.groupName}>{groupInfo.groupName}</Text>
          <TouchableOpacity>
            <Text style={styles.edit}>편집</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.date}> {groupInfo.date}</Text>
      </View>
      <Plan />
    </View>
  );
};
export default Content;
