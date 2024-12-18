import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native";
import moment from "moment";
import "moment/locale/ko";
import styles from "./styles";
import renderHeader from "./renderHeader";
import renderDays from "./renderDays";
import renderCells from "./renderCells";
import renderUserLegend from "./renderUserLegend";
import renderOverlappingDates from "./renderOverlappingDates";
import renderTripOptions from "./renderTripOption";
import useFindOverlappingDates from "@/hooks/useFindOverlappingDates";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "expo-router";
import { OverlappingDates, UserDateRanges } from "@/types/calendar/calendar";
import { useCalendarState } from "@/reducers/useCalendarState";
import { Socket } from "socket.io-client";
import createSocketHandler from "../../../api/group/createSocketHandler";
import authState from "@/recoil/authState";
import Button from "@/components/common/Button/button";
import scheduleMutations from "@/hooks/api/scheduleMutation";
import tripIdState from "@/recoil/tripIdState";

interface CalendarProps {
  groupName: string;
  groupId: number;
}

const Calendar = ({ groupName, groupId }: CalendarProps) => {
  const router = useRouter();
  const { state, actions } = useCalendarState();
  const [overlappingDates, setOverlappingDates] = useState<OverlappingDates[]>(
    []
  );
  const [userDateRanges, setUserDateRanges] = useState<UserDateRanges>({});
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);

  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const [userNicknames, setUserNicknames] = useState<{ [key: string]: string }>(
    {}
  );
  const userValue = useRecoilValue(authState);
  const [, setTripId] = useRecoilState(tripIdState);

  const pastelColors = [
    "#FFB3B3",
    "#B3FFB3",
    "#B3B3FF",
    "#FFB3FF",
    "#B3FFFF",
    "#FFFFB3",
    "#FFD9B3",
    "#D9B3FF",
    "#B3FFD9",
    "#FFB3D9",
  ];
  useEffect(() => {
    const userIds = Object.keys(userDateRanges);
    const newUserColors: { [key: string]: string } = {};
    const newUserNicknames: { [key: string]: string } = {};

    userIds.forEach((userId, index) => {
      newUserColors[userId] = pastelColors[index % pastelColors.length];
      if (userDateRanges[userId]?.nickname) {
        newUserNicknames[userId] = userDateRanges[userId].nickname;
      }
    });

    setUserColors((prev) => ({ ...prev, ...newUserColors }));
    setUserNicknames((prev) => ({ ...prev, ...newUserNicknames }));
  }, [userDateRanges]);

  const socketHandlerRef = useRef<ReturnType<
    typeof createSocketHandler
  > | null>(null);

  useEffect(() => {
    const handler = createSocketHandler({
      setIsConnected,
      setUserDateRanges,
      setSocket,
      userId: userValue.id,
      groupId,
      router,
      setTripId,
    });

    socketHandlerRef.current = handler;
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

  const handleSubmit = async () => {
    if (state.confirmedTrip) {
      const formattedSchedule = `${moment(state.confirmedTrip.startDate).format(
        "YYYY.MM.DD"
      )}~${moment(state.confirmedTrip.endDate).format("YYYY.MM.DD")}`;
      const body = {
        groupId,
        groupName: groupName,
        date: formattedSchedule,
      };
      mutate(body);
    }
  };
  const { mutate } = scheduleMutations(groupId, socket);

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
              socketHandlerRef,
              userDateRanges,
              userColors
            )}
          </View>
        </View>

        {renderUserLegend(userColors, String(userValue.id), userNicknames)}
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

      <View style={styles.submitContainer}>
        <Button variant="primary" title="일정확정" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
