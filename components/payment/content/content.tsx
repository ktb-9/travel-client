import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Payments from "../payments/payments";
import addIcon from "@/assets/images/plus.png";
import { PaymentState } from "@/types/payment/payment";
const Content = () => {
  const [value, SetValue] = useState<PaymentState[]>([
    {
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
      category: "",
      description: "",
      date: "",
      price: 0,
      pay: 0,
      group: [],
    };
    SetValue((prev) => [...prev, newValue]);
  };
  console.log(value);
  return (
    <View style={styles.container}>
      {value.map((value, index) => (
        <Payments key={index} value={value} SetValue={SetValue} index={index} />
      ))}

      <TouchableOpacity onPress={addPayments}>
        <Image source={addIcon} />
      </TouchableOpacity>
    </View>
  );
};
export default Content;
