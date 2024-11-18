import { Modal, TouchableOpacity, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import styles from "./dateModalStyle";
import { DatePickerModalProps } from "@/types/payment/payment";

const DatePickerModal = ({
  isVisible,
  onClose,
  onSelectDate,
  currentDate,
}: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (_: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      if (Platform.OS === "android") {
        onSelectDate(date);
        onClose();
      }
    }
  };

  const handleConfirm = () => {
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            style={{ width: Platform.OS === "ios" ? "100%" : "80%" }}
          />
          {Platform.OS === "ios" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.modalButton}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={[styles.buttonText, styles.confirmText]}>
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
