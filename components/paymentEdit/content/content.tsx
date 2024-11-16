import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Payments from "../payments/payments";

import { PaymentEditState } from "@/types/payment/payment";
import SubmitButton from "../payments/SubmitButton";
import addPaymentsMutation from "@/hooks/api/addPaymentsMutation";
import { useRecoilValue } from "recoil";
import paymentState from "@/recoil/paymentState";

const Content = () => {
  const { mutate } = addPaymentsMutation();
  const dataValue = useRecoilValue(paymentState);
  console.log(dataValue);
  const [value, SetValue] = useState<PaymentEditState[]>(dataValue);

  const handleSubmit = () => {
    // 지출 등록 로직 구현

    mutate(value);
  };
  return (
    <View style={styles.container}>
      {value.map((value, index) => (
        <Payments key={index} value={value} SetValue={SetValue} index={index} />
      ))}

      <SubmitButton onSubmit={handleSubmit} />
    </View>
  );
};
export default Content;
