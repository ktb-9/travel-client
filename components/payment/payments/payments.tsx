import { PaymentType } from "@/types/payment/payment";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";

const Payments = ({ value, SetValue, index }: PaymentType) => {
  const handleInputChange = (field: string, text: string) => {
    SetValue((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: text } : item))
    );
  };
  return (
    <View>
      <TextInput
        value={value.description || ""}
        onChangeText={(text) => handleInputChange("description", text)}
        style={styles.description}
      />
    </View>
  );
};
export default Payments;
