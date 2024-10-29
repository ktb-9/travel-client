import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import { locationState } from "@/recoil/locationState";
const Header = () => {
  const navigation = useNavigation();
  const [, setLocations] = useRecoilState(locationState);
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  const backBtn = () => {
    navigation.goBack();
    setLocations([]);
  };
  if (!fontsLoaded) return null;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={backBtn}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>여행 그룹 생성</Text>
    </View>
  );
};
export default Header;
