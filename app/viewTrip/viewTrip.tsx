import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import styles from "./styles";
import Header from "@/components/viewTrip/header/header";
import Content from "@/components/viewTrip/content/content";

const ViewTrip = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ViewTrip;
