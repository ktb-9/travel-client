import { Text, View, Image } from "react-native";
import intro from "@/assets/images/intro.png";
import styles from "./styles";
import { useFonts } from "expo-font";

const Intro = () => {
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Black.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={intro} resizeMode="cover"></Image>
        <Text style={styles.mainTitle}>여행을 즐길 준비 되셨나요?</Text>
        <Text style={styles.mainTitle}>편리하고 행복한 여행 !</Text>
        <Text>일정, 정산, 여행 편리한 기능</Text>
      </View>
    </View>
  );
};
export default Intro;
