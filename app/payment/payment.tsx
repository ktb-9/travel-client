import Header from "@/components/payment/header/header";
import { SafeAreaView, ScrollView } from "react-native";
import styles from "./styles";
import Content from "@/components/payment/content/content";

const Payment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Payment;
