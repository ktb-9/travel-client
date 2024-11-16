import { SafeAreaView, ScrollView, Text, View } from "react-native";

import Header from "@/components/paymentEdit/header/header";
import Content from "@/components/paymentEdit/content/content";
import styles from "./styles";

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
