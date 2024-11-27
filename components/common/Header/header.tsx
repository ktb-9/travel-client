import { Text, View, TouchableOpacity } from "react-native";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { HeaderProps } from "@/types/common/header";
const Header = ({ title, onPress }: HeaderProps) => {
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Ionicons name="chevron-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
export default Header;
