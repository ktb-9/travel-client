import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";

import styles from "./styles";

import CategoryModal from "./modal/modal";
import DatePickerModal from "./modal/dateModal";
import { PaymentInputProps } from "@/types/payment/payment";

const PaymentInput: React.FC<PaymentInputProps> = ({
  value,
  onInputChange,
  onCategorySelect,
  onDateSelect,
  isDropdownVisible,
  setDropdownVisible,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value.date ? new Date(value.date) : new Date()
  );

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };
  console.log(value);
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.categoryButtonText}>
          {value.category || "카테고리 선택"}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <CategoryModal
        isDropdownVisible={isDropdownVisible}
        setDropdownVisible={setDropdownVisible}
        handleCategorySelect={onCategorySelect}
      />

      <TextInput
        style={styles.bankInput}
        placeholder="세부사항(ex 은행골)"
        placeholderTextColor="#999"
        value={value.description || ""}
        onChangeText={(text) => onInputChange("description", text)}
      />

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.dateText}>
          {value.date || formatDate(selectedDate)}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onSelectDate={handleDateSelection}
        currentDate={selectedDate}
      />

      <TextInput
        style={styles.amountInput}
        placeholder="금액"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={String(value.price || 0)}
        onChangeText={(text) => onInputChange("price", text)}
      />
    </View>
  );
};
export default PaymentInput;
