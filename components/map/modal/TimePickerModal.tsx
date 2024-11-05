import React from "react";
import { View, Modal, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TimePickerModalProps } from "@/types/map/map";
import styles from "@/app/map/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import { tripPlanState } from "@/recoil/tripPlanState";
import { categoryMap } from "@/constants/default";

const TimePickerModal = ({
  showModal,
  setShowModal,
  selectedPlace,
  setSelectedPlace,
  selectedTime,
  setSelectedTime,
  setShowTimePicker,
  showTimePicker,
}: TimePickerModalProps) => {
  const router = useRouter();
  const { day } = useLocalSearchParams<{ day: string }>();
  const [, setTripPlan] = useRecoilState(tripPlanState);
  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const handleTimeConfirm = () => {
    if (!selectedPlace) return;

    const currentDay = parseInt(day);
    const formattedTime = selectedTime.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const location = {
      name: selectedPlace.name,
      address: selectedPlace.address,
      visitTime: formattedTime,
      category: categoryMap[selectedPlace.category] || "정보없음",
    };

    setTripPlan((prev) => ({
      ...prev,
      days: prev.days.map((d) =>
        d.day === currentDay
          ? {
              ...d,
              locations: [...d.locations, location],
            }
          : d
      ),
    }));

    setShowModal(false);
    setSelectedPlace(null);
    router.back();
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>
          <Text style={styles.modalAddress}>{selectedPlace?.address}</Text>
          <Text style={styles.modalAddress}>
            {selectedPlace && selectedPlace.category
              ? categoryMap[selectedPlace.category]
              : "정보 없음"}
          </Text>

          <Text style={styles.modalSubtitle}>방문 시간 설정</Text>

          {Platform.OS === "ios" ? (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              locale="ko-KR"
            />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.androidTimeButton}
              >
                <Text style={styles.androidTimeButtonText}>
                  {selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleTimeChange}
                  locale="ko-KR"
                />
              )}
            </>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonTextCancel}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={handleTimeConfirm}
            >
              <Text style={styles.modalButtonTextConfirm}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default TimePickerModal;
