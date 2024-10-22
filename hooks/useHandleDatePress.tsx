import moment from "moment";
import "moment/locale/ko";
import { MutableRefObject } from "react";
interface DateRange {
  start: moment.Moment | null;
  end: moment.Moment | null;
}
interface datePressState {
  date: moment.Moment;
  stompHandlerRef: MutableRefObject<{
    sendCalendarUpdate: (range: DateRange) => void;
  } | null>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const useHandleDatePress = (
  date: moment.Moment,
  stompHandlerRef: any,
  isDragging: any,
  setIsDragging: any,
  dateRange: any,
  setDateRange: any
) => {
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
export default useHandleDatePress;
