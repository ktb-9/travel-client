import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native";
import moment from "moment";
import "moment/locale/ko";
import styles from "./styles";
import createStompHandler from "./createStompHandler";
import renderHeader from "./renderHeader";
import renderDays from "./renderDays";
import renderCells from "./renderCells";
import renderUserLegend from "./renderUserLegend";
import renderOverlappingDates from "./renderOverlappingDates";
import renderTripOptions from "./renderTripOption";
import useFindOverlappingDates from "@/hooks/useFindOverlappingDates";
import { useRecoilState } from "recoil";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import { useRouter } from "expo-router";
import { OverlappingDates, UserDateRanges } from "@/types/calendar/calendar";
import { useCalendarState } from "@/reducers/useCalendarState";

const Calendar = ({ groupName }: { groupName: string }) => {
  const router = useRouter();
  const [, setSchedule] = useRecoilState(createSchdeuleState);
  const { state, actions } = useCalendarState();
  const [overlappingDates, setOverlappingDates] = useState<OverlappingDates[]>(
    []
  );
  const [userDateRanges, setUserDateRanges] = useState<UserDateRanges>({});

  const currentUserId = "id1";
  const userColors: { [key: string]: string } = {
    id1: "#FFE1E1",
    id2: "#E1FFE1",
    id3: "#E1E1FF",
    id4: "#FFE1FF",
  };

  const stompHandlerRef = useRef<ReturnType<typeof createStompHandler> | null>(
    null
  );

  useEffect(() => {
    const handler = createStompHandler({
      setIsEnterChat: actions.setIsEnterChat,
      setUserDateRanges,
      setWsClient: actions.setWsClient,
      userId: currentUserId,
    });

    stompHandlerRef.current = handler;
    handler.connect();

    return () => {
      handler.disconnect();
    };
  }, []);

  useEffect(() => {
    useFindOverlappingDates({
      userDateRanges,
      setOverlappingDates,
    });
  }, [userDateRanges]);

  const onPressArrow = (direction: number) => {
    actions.setCurrentMonth(state.currentMonth.clone().add(direction, "month"));
  };
  const handleScheduleConfirm = () => {
    if (state.confirmedTrip) {
      const formattedSchedule = `${moment(state.confirmedTrip.startDate).format(
        "YYYY.MM.DD"
      )}~${moment(state.confirmedTrip.endDate).format("YYYY.MM.DD")}`;
      setSchedule({
        groupId: 1,
        groupName: groupName,
        date: formattedSchedule,
      });
    }
    router.push("/createTrip/createTrip");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendar}>
        <Text style={styles.title}>공동 일정 등록</Text>
        <View style={{ backgroundColor: "#2c2c2c", borderRadius: 20 }}>
          {renderHeader({ onPressArrow, currentMonth: state.currentMonth })}
          {renderDays()}
          <View>
            {renderCells(
              state.currentMonth,
              stompHandlerRef,
              userDateRanges,
              userColors
            )}
          </View>
        </View>

        {renderUserLegend(userColors, currentUserId)}
      </View>
      <View style={styles.overlappingDatesContainer}>
        <Text style={styles.subtitle}>모두가 가능한 날짜</Text>
        {renderOverlappingDates({
          overlappingDates,
          setSelectedTrip: actions.setSelectedTrip,
          setModalVisible: actions.setModalVisible,
          confirmedTrip: state.confirmedTrip,
        })}
        {state.confirmedTrip && (
          <View style={styles.confirmedTripContainer}>
            <Text style={styles.confirmedTripText}>
              확정된 일정:{" "}
              {moment(state.confirmedTrip.startDate).format("MM/DD")} -{" "}
              {moment(state.confirmedTrip.endDate).format("MM/DD")}
              {` (${state.confirmedTrip.nights}박${
                state.confirmedTrip.nights + 1
              }일)`}
            </Text>
          </View>
        )}
      </View>

      <Modal
        visible={state.modal.visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => actions.setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>여행 기간 선택</Text>
            {renderTripOptions({
              setModalVisible: actions.setModalVisible,
              setConfirmedTrip: actions.setConfirmedTrip,
              selectedTrip: state.selectedTrip,
            })}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => actions.setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.submit} onPress={handleScheduleConfirm}>
          <Text style={styles.submitText}>일정확정</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
