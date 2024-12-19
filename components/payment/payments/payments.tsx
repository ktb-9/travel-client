import { TouchableOpacity, View } from "react-native";

import styles from "./styles";
import PaymentInput from "./PaymentInput";

import UserList from "./UserList";
import { PaymentType } from "@/types/payment/payment";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
const Payments: React.FC<PaymentType> = ({ value, SetValue, index }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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
    SetValue((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              group: item.group.includes(id)
                ? item.group.filter((user) => user !== id)
                : [...item.group, id],
            }
          : item
      )
    );
  };
  const handleDelete = () => {
    SetValue((prev) => prev.filter((item, i) => i != index));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.trash} onPress={handleDelete}>
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
