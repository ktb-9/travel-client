import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import Header from "@/components/createSchedule/header/header";
import Content from "@/components/createSchedule/content/content";

const createSchedule = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
};
export default createSchedule;
