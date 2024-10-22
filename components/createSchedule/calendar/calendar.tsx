import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import "moment/locale/ko";
import styles from "./styles";
import { Client } from "@stomp/stompjs";
import createStompHandler from "./createStompHandler";
import renderUserLegend from "./renderUserLegend";
import renderDays from "./renderDays";
import renderCells from "./renderCells";
import renderHeader from "./renderHeader";

interface UserDateRanges {
  [key: string]: {
    start: string | null;
    end: string | null;
    userId: string;
  };
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const [userDateRanges, setUserDateRanges] = useState<UserDateRanges>({});

  const [, setWsClient] = useState<Client | undefined>();
  const [, setIsEnterChat] = useState(false);

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
      setIsEnterChat,
      setUserDateRanges,
      setWsClient,
      userId: currentUserId,
    });

    stompHandlerRef.current = handler;
    handler.connect();

    return () => {
      handler.disconnect();
    };
  }, []);

  const onPressArrow = (direction: number) => {
    setCurrentMonth(currentMonth.clone().add(direction, "month"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendar}>
        <Text style={styles.title}>공동 일정 등록</Text>
        {renderHeader({ onPressArrow, currentMonth })}
        {renderDays()}
        <View>
          {renderCells(
            currentMonth,
            stompHandlerRef,
            userDateRanges,
            userColors
          )}
        </View>
        {renderUserLegend(userColors, currentUserId)}
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
