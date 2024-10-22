import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import "moment/locale/ko";
import styles from "./styles";
import { Client } from "@stomp/stompjs";
import createStompHandler from "./createStompHandler";

interface DateRange {
  start: moment.Moment | null;
  end: moment.Moment | null;
}

interface UserDateRanges {
  [key: string]: {
    start: string | null;
    end: string | null;
    userId: string;
  };
}

interface CalendarMessage {
  type: "SELECT_DATE" | "CLEAR_DATE";
  dateRange: {
    start: string | null;
    end: string | null;
  };
  userId: string;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [userDateRanges, setUserDateRanges] = useState<UserDateRanges>({});
  const [isDragging, setIsDragging] = useState(false);
  const [, setWsClient] = useState<Client | undefined>();
  const [, setIsEnterChat] = useState(false);

  const currentUserId = "id1"; // Replace with actual user ID
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

  const handleDatePress = (date: moment.Moment) => {
    if (!isDragging) {
      const newRange = { start: date, end: date };
      setDateRange(newRange);
      setIsDragging(true);
      stompHandlerRef.current?.sendCalendarUpdate(newRange);
    } else {
      const newStart = moment.min(dateRange.start!, date);
      const newEnd = moment.max(dateRange.start!, date);
      const newRange = { start: newStart, end: newEnd };
      setDateRange(newRange);
      setIsDragging(false);
      stompHandlerRef.current?.sendCalendarUpdate(newRange);
    }
  };

  const onPressArrow = (direction: number) => {
    setCurrentMonth(currentMonth.clone().add(direction, "month"));
  };

  const isDateInUserRanges = (date: moment.Moment): string[] => {
    const userIds: string[] = [];
    Object.entries(userDateRanges).forEach(([userId, range]) => {
      if (range.start && range.end) {
        const start = moment(range.start);
        const end = moment(range.end);
        if (date.isBetween(start, end, "day", "[]")) {
          userIds.push(userId);
        }
      }
    });
    return userIds;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => onPressArrow(-1)}
        style={styles.arrowButton}
      >
        <Text style={styles.arrowText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{currentMonth.format("YYYY년 M월")}</Text>
      <TouchableOpacity
        onPress={() => onPressArrow(1)}
        style={styles.arrowButton}
      >
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDays = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <View style={styles.daysRow}>
        {days.map((day, index) => (
          <Text
            key={index}
            style={[styles.dayText, index === 0 && styles.sundayText]}
          >
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderUserIndicators = (userIds: string[]) => {
    return (
      <View style={styles.userIndicatorsContainer}>
        {userIds.map((userId, index) => (
          <View
            key={userId}
            style={[
              styles.userIndicator,
              { backgroundColor: userColors[userId] || "#CCCCCC" },
              index === 0 && styles.firstIndicator,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCells = () => {
    const monthStart = currentMonth.clone().startOf("month");
    const monthEnd = currentMonth.clone().endOf("month");
    const startDate = monthStart.clone().startOf("week");
    const endDate = monthEnd.clone().endOf("week");

    const rows = [];
    let days = [];
    let day = startDate.clone();

    while (day.isBefore(endDate, "day")) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day.clone();
        const isCurrentMonth = day.month() === currentMonth.month();
        const isToday = day.isSame(moment(), "day");
        const isSunday = day.day() === 0;
        const usersWithDate = isDateInUserRanges(day);

        days.push(
          <Pressable
            key={day.format("YYYY-MM-DD")}
            onPress={() => handleDatePress(cloneDay)}
            style={({ pressed }) => [
              styles.cell,
              isToday && styles.today,
              isSunday && styles.sunday,
              pressed && styles.pressedCell,
            ]}
          >
            <Text
              style={[
                styles.cellText,
                !isCurrentMonth && styles.disabledText,
                isSunday && styles.sundayText,
                isToday && styles.todayText,
              ]}
            >
              {day.format("D")}
            </Text>
            {usersWithDate.length > 0 && renderUserIndicators(usersWithDate)}
          </Pressable>
        );
        day.add(1, "day");
      }
      rows.push(
        <View key={day.format("YYYY-MM-DD")} style={styles.row}>
          {days}
        </View>
      );
      days = [];
    }
    return rows;
  };

  const renderUserLegend = () => (
    <View style={styles.legendContainer}>
      {Object.entries(userColors).map(([userId, color]) => (
        <View key={userId} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: color }]} />
          <Text style={styles.legendText}>
            {userId === currentUserId ? "나" : `사용자 ${userId}`}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendar}>
        <Text style={styles.title}>공동 일정 등록</Text>
        {renderHeader()}
        {renderDays()}
        <View>{renderCells()}</View>
        {renderUserLegend()}
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
