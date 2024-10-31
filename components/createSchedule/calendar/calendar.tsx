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

  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const [userNicknames, setUserNicknames] = useState<{ [key: string]: string }>(
    {}
  );

  const currentUserId = "1";
  // 10개의 파스텔 컬러 배열 정의
  const pastelColors = [
    "#FFB3B3", // 연한 빨강
    "#B3FFB3", // 연한 초록
    "#B3B3FF", // 연한 파랑
    "#FFB3FF", // 연한 보라
    "#B3FFFF", // 연한 청록
    "#FFFFB3", // 연한 노랑
    "#FFD9B3", // 연한 주황
    "#D9B3FF", // 연한 라벤더
    "#B3FFD9", // 연한 민트
    "#FFB3D9", // 연한 분홍
  ];

  // userDateRanges가 변경될 때마다 색상 할당
  useEffect(() => {
    const userIds = Object.keys(userDateRanges);
    const newUserColors: { [key: string]: string } = {};
    const newUserNicknames: { [key: string]: string } = {};

    userIds.forEach((userId, index) => {
      if (!userColors[userId]) {
        // Assign a new color only if it hasn't been set
        newUserColors[userId] = pastelColors[index % pastelColors.length];
      }
      if (userDateRanges[userId]?.nickname && !userNicknames[userId]) {
        // Set nickname if available and hasn't been set already
        newUserNicknames[userId] = userDateRanges[userId].nickname;
      }
    });

    if (Object.keys(newUserColors).length > 0) {
      setUserColors((prev) => ({
        ...prev,
        ...newUserColors,
      }));
    }

    if (Object.keys(newUserNicknames).length > 0) {
      setUserNicknames((prev) => ({
        ...prev,
        ...newUserNicknames,
      }));
    }
  }, [userDateRanges]);

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

        {renderUserLegend(userColors, currentUserId, userNicknames)}
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
