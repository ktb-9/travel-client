import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";

const Payment = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>가계부</Text>
      <View style={styles.wrapper}>
        <Text>fasf</Text>
        <TouchableOpacity onPress={() => router.push("/payment/payment")}>
          <Text>정산</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Payment;
