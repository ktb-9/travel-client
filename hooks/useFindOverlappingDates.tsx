import {
  OverlappingDates,
  UseFindOverlappingDatesProps,
} from "@/types/calendar/calendar";
import moment from "moment";
import "moment/locale/ko";

const useFindOverlappingDates = ({
  userDateRanges,
  setOverlappingDates,
}: UseFindOverlappingDatesProps) => {
  // 날짜 배열
  const dates: { [key: string]: number } = {};
  // 유저 전체수
  const userCount = Object.keys(userDateRanges).length;

  // 각 유저의 날짜 범위에 대해 날짜별 카운트
  Object.values(userDateRanges).forEach(({ start, end }) => {
    if (start && end) {
      let current = moment(start);
      const endDate = moment(end);
      // 끝날짜 전에 같으면
      while (current.isSameOrBefore(endDate)) {
        const dateStr = current.format("YYYY-MM-DD");
        // 몇일 겹치는지 카운트
        dates[dateStr] = (dates[dateStr] || 0) + 1;
        current.add(1, "days");
      }
    }
  });

  // 모든 유저가 가능한 날짜 찾기
  const overlappingRanges: OverlappingDates[] = [];
  let currentRange: OverlappingDates | null = null;

  Object.entries(dates).forEach(([dateStr, count]) => {
    // 만약 유저수와 카운트가같으면
    if (count === userCount) {
      // 아직 범위가 시작되지 않았다면 새로운 범위를 시작합
      if (!currentRange) {
        currentRange = {
          startDate: dateStr,
          endDate: dateStr,
          numberOfDays: 1,
        };
      }
      //   연속된 날짜 범위 처리
      else {
        currentRange.endDate = dateStr;
        currentRange.numberOfDays =
          moment(dateStr).diff(moment(currentRange.startDate), "days") + 1;
      }
    } else if (currentRange) {
      overlappingRanges.push(currentRange);
      currentRange = null;
    }
  });

  if (currentRange) {
    overlappingRanges.push(currentRange);
  }

  setOverlappingDates(overlappingRanges);
};
export default useFindOverlappingDates;
