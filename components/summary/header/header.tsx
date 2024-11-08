import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
const Header = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>여행 요약</Text>
    </View>
  );
};
export default Header;
