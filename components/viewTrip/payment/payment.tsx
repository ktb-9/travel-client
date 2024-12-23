import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import getPaymentsQuery from "@/hooks/api/getPaymentsQuery";
import useCalculatePayment from "@/hooks/payment/useCalculatePayment";
import Graph from "./graph/graph";
import { Feather } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import paymentState from "@/recoil/paymentState";
import tripIdState from "@/recoil/tripIdState";

const Payment = () => {
  const tripId = useRecoilValue(tripIdState);
  const { data, isLoading, isError } = getPaymentsQuery(tripId);
  const [, setState] = useRecoilState(paymentState);
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3182F6" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>데이터를 불러올 수 없습니다</Text>
      </View>
    );
  }
  console.log("hello", JSON.stringify(data));

  const value = useCalculatePayment(data, 1);
  const handleEdit = () => {
    router.push("/paymentEdit/payment");
    setState(data);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>가계부</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.addButton} onPress={handleEdit}>
              <Feather name="edit" size={24} color="#3182F6" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/payment/payment")}
            >
              <Feather name="plus" size={24} color="#3182F6" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Graph data={value} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
