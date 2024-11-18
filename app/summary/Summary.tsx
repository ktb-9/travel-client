import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import Header from "@/components/summary/header/header";
import Content from "@/components/summary/content/content";
import { useRouter } from "expo-router";

const Summary = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    NotoBold: require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.endTrip}
            onPress={() => router.push("/home/home")}
          >
            <Text style={styles.endText}>홈 으로 가기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Summary;
