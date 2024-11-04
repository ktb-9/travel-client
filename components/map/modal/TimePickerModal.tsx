import React from "react";
import { View, Modal, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TimePickerModalProps } from "@/types/map/map";
import styles from "@/app/map/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import { tripPlanState } from "@/recoil/tripPlanState";

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
      category: codeToCategories[selectedPlace.category] || "정보없음",
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

  const codeToCategories: { [key: string]: string } = {
    MT1: "대형마트",
    CS2: "편의점",
    PS3: "어린이집, 유치원",
    SC4: "학교",
    AC5: "학원",
    PK6: "주차장",
    OL7: "주유소, 충전소",
    SW8: "지하철역",
    BK9: "은행",
    CT1: "문화시설",
    AG2: "중개업소",
    PO3: "공공기관",
    AT4: "관광지",
    AD5: "숙박",
    FD6: "식당",
    CE7: "카페",
    HP8: "병원",
    PM9: "약국",
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
              ? codeToCategories[selectedPlace.category]
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
