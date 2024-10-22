import moment from "moment";
import "moment/locale/ko";
interface DateRange {
  start: string | moment.Moment | null;
  end: string | moment.Moment | null;
}

const useIsDateInUserRanges = (
  date: moment.Moment,
  userDateRanges: Record<string, DateRange>
): string[] => {
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
export default useIsDateInUserRanges;
