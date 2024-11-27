import { SafeAreaView, ScrollView, View } from "react-native";
import styles from "./styles";
import Header from "@/components/common/Header/header";

import Payment from "@/components/viewTrip/payment/payment";
import { useRouter } from "expo-router";
import Button from "@/components/common/Button/button";
import Infos from "@/components/viewTrip/Infos/infos";

const ViewTrip = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => router.push("/home/home")} title="여행 일정" />
      <ScrollView contentContainerStyle={styles.content}>
        <Infos />
        <Payment />
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <Button
          variant="primary"
          title="여행 종료"
          onPress={() => router.push("/summary/Summary")}
        />
      </View>
    </SafeAreaView>
  );
};
export default ViewTrip;
