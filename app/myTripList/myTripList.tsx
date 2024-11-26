import { SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import Header from "@/components/myTripList/header/header";
import Content from "@/components/myTripList/content/content";

const myTripList = () => {
  return (
    <SafeAreaView style={styles.container} testID="safe-area-view">
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
};
export default myTripList;
