import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import getPaymentsQuery from "@/hooks/api/getPaymentsQuery";
import useCalculatePayment from "@/hooks/payment/useCalculatePayment";
import Graph from "./graph/graph";

const Payment = () => {
  const { data, isLoading, isError } = getPaymentsQuery(1);
  const router = useRouter();
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 트립</Text>;
  }
  const value = useCalculatePayment(data.data, 1);
  console.log(JSON.stringify(value));
  return (
    <View style={styles.container}>
      <Text style={styles.header}>가계부</Text>
      <View style={styles.wrapper}>
        <Text>fasf</Text>
        <TouchableOpacity onPress={() => router.push("/payment/payment")}>
          <Text>정산</Text>
        </TouchableOpacity>
        <ScrollView>
          <Graph data={value} />
        </ScrollView>
      </View>
    </View>
  );
};
export default Payment;
