import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles";
import Header from "@/components/createSchedule/header";

const createSchedule = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};
export default createSchedule;
