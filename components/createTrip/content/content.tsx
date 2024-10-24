import { Text, TextInput, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import { useFonts } from "expo-font";
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
        <Text style={styles.groupName}> {groupInfo.groupName}</Text>
        <Text style={styles.date}> {groupInfo.date}</Text>
      </View>
    </View>
  );
};
export default Content;
