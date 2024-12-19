import { TouchableOpacity, View } from "react-native";

import styles from "./styles";
import PaymentInput from "./PaymentInput";

import UserList from "./UserList";
import { PaymentEditType } from "@/types/payment/payment";
import { Ionicons } from "@expo/vector-icons";
import deletePaymentsMutation from "@/hooks/api/deletePaymentsMutation";
import { useState } from "react";
const Payments: React.FC<PaymentEditType> = ({ value, SetValue, index }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const deleteMutation = deletePaymentsMutation();
  const handleInputChange = (field: string, text: string) => {
    SetValue((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: field === "price" ? parseInt(text) : text,
            }
          : item
      )
    );
  };

  const handleCategorySelect = (category: string) => {
    SetValue((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, category: category } : item
      )
    );
    setDropdownVisible(false);
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    SetValue((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, date: dateString } : item
      )
    );
  };

  const handleCheckPaymentUser = (id: number) => {
    SetValue((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, pay: item.pay === id ? 0 : id } : item
      )
    );
  };

  const handleUserGroupAdd = (id: number) => {
    SetValue((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index
          ? {
              ...item,
              group: item.group.some((user: any) => user.user_id === id)
                ? item.group.filter((user: any) => user.user_id !== id)
                : [...item.group, { user_id: id, nickname: "" }],
            }
          : item
      )
    );
  };

  const handleDelete = (paymentId: number) => {
    SetValue((prev) => prev.filter((item) => item.paymentId != paymentId));
    deleteMutation.mutate(paymentId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.trash}
        onPress={() => handleDelete(value.paymentId)}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
      <PaymentInput
        value={value}
        onInputChange={handleInputChange}
        onCategorySelect={handleCategorySelect}
        onDateSelect={handleDateSelect}
        isDropdownVisible={isDropdownVisible}
        setDropdownVisible={setDropdownVisible}
      />
      <UserList
        value={value}
        onPaymentUserCheck={handleCheckPaymentUser}
        onUserGroupAdd={handleUserGroupAdd}
      />
    </View>
  );
};

export default Payments;
