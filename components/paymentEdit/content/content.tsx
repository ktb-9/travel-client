import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Payments from "../payments/payments";

import { PaymentEditState } from "@/types/payment/payment";
import SubmitButton from "../payments/SubmitButton";
import { useRecoilValue } from "recoil";
import paymentState from "@/recoil/paymentState";
import updatePaymentsMutation from "@/hooks/api/updatePaymentsMutation";
import tripIdState from "@/recoil/tripIdState";

const Content = () => {
  const tripId = useRecoilValue(tripIdState);
  const { mutate } = updatePaymentsMutation(tripId);
  const dataValue = useRecoilValue(paymentState);
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
