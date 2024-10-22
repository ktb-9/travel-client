import { Pressable, View, Text } from "react-native";
import styles from "./styles";
import useHandleDatePress from "@/hooks/useHandleDatePress";
import useIsDateInUserRanges from "@/hooks/useIsDateInUserRanges";
import moment from "moment";
import "moment/locale/ko";
import { useState } from "react";
import renderUserIndicators from "./renderUserIndicator";
interface DateRange {
  start: moment.Moment | null;
  end: moment.Moment | null;
}

interface StompHandlerRef {
  sendCalendarUpdate: (range: DateRange) => void;
}

// userDateRanges가 string일 수 있으므로 변환 필요
interface UserDateRange {
  start: string | null;
  end: string | null;
  userId: string;
}

const renderCells = (
  currentMonth: moment.Moment, // currentMonth는 Moment 객체
  stompHandlerRef: React.MutableRefObject<StompHandlerRef | null>, // stompHandlerRef는 MutableRefObject
  userDateRanges: Record<string, UserDateRange>, // 사용자 날짜 범위
  userColors: Record<string, string> // 사용자 ID와 색상 매핑
) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const monthStart = currentMonth.clone().startOf("month");
  const monthEnd = currentMonth.clone().endOf("month");
  const startDate = monthStart.clone().startOf("week");
  const endDate = monthEnd.clone().endOf("week");

  const rows = [];
  let days = [];
  let day = startDate.clone();
  // 날짜(day)가 endDate보다 이전인 동안, 일주일 단위로 날짜를 순회
  // 그 날짜가 현재 달에 속하는지(isCurrentMonth)
  // 그 날짜가 오늘인지(isToday)
  // 그 날짜가 일요일인지(isSunday)
  // 그 날짜가 사용자 일정 범위에 속하는지(usersWithDate)

  while (day.isBefore(endDate, "day")) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day.clone();
      const isCurrentMonth = day.month() === currentMonth.month();
      const isToday = day.isSame(moment(), "day");
      const isSunday = day.day() === 0;
      const usersWithDate = useIsDateInUserRanges(day, userDateRanges);

      days.push(
        <Pressable
          key={day.format("YYYY-MM-DD")}
          onPress={() =>
            useHandleDatePress(
              cloneDay,
              stompHandlerRef,
              isDragging,
              setIsDragging,
              dateRange,
              setDateRange
            )
          }
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
          {usersWithDate.length > 0 &&
            renderUserIndicators(usersWithDate, userColors)}
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
export default renderCells;
