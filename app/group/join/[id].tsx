import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import Content from "@/components/creategroupSchedule/content/content";
import Header from "@/components/creategroupSchedule/header/header";

const createSchedule = () => {
  return (
    <SafeAreaView style={styles.container} testID="safe-area-view">
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
};
export default createSchedule;
