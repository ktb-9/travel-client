import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import Header from "@/components/viewTrip/header/header";
import Content from "@/components/viewTrip/content/content";
import Payment from "@/components/viewTrip/payment/payment";
import { useRouter } from "expo-router";

const ViewTrip = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
        <Payment />
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.endTrip}
          onPress={() => router.push("/summary/Summary")}
        >
          <Text style={styles.endText}>여행 종료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ViewTrip;
