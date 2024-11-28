import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Payments from "../payments/payments";
import addIcon from "@/assets/images/plus.png";
import { PaymentState } from "@/types/payment/payment";
import SubmitButton from "../payments/SubmitButton";
import addPaymentsMutation from "@/hooks/api/addPaymentsMutation";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
const Content = () => {
  const { mutate } = addPaymentsMutation();
  const tripId = useRecoilValue(tripIdState);
  const [value, SetValue] = useState<PaymentState[]>([
    {
      tripId: tripId,
      category: "",
      description: "",
      date: "",
      price: 0,
      pay: 0,
      group: [],
    },
  ]);
  const addPayments = () => {
    const newValue: PaymentState = {
      tripId: tripId,
      category: "",
      description: "",
      date: "",
      price: 0,
      pay: 0,
      group: [],
    };
    SetValue((prev) => [...prev, newValue]);
  };
  const handleSubmit = () => {
    // 지출 등록 로직 구현

    mutate(value);
  };
  return (
    <View style={styles.container}>
      {value.map((value, index) => (
        <Payments key={index} value={value} SetValue={SetValue} index={index} />
      ))}

      <TouchableOpacity onPress={addPayments}>
        <Image source={addIcon} />
      </TouchableOpacity>
      <SubmitButton onSubmit={handleSubmit} />
    </View>
  );
};
export default Content;
