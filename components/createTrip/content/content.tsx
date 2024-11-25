import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useRecoilValue } from "recoil";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import { useFonts } from "expo-font";
import Plan from "../plan/plan";
import Button from "@/components/common/Button/button";

const Content = () => {
  const groupInfo = useRecoilValue(createSchdeuleState);
  const [fontsLoaded] = useFonts({
    NotoSans: require("@/assets/fonts/NotoSansKR-Medium.ttf"),
    RobotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.groupName}>{groupInfo.groupName}</Text>
          <Button
            variant="secondary"
            title="편집"
            onPress={() => console.log("hello")}
          />
        </View>
        <Text style={styles.date}>{groupInfo.date}</Text>
      </View>
      <Plan />
    </View>
  );
};

export default Content;
