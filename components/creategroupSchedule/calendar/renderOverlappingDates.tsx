import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import moment from "moment";
import "moment/locale/ko";
import { ConfirmedTrip, overlapDateRange } from "@/types/calendar/calendar";

interface RenderOverlappingDatesProps {
  overlappingDates: overlapDateRange[];
  setSelectedTrip: (trip: overlapDateRange) => void;
  setModalVisible: (visible: boolean) => void;
  confirmedTrip: ConfirmedTrip | null;
}

const renderOverlappingDates = ({
  overlappingDates,
  setSelectedTrip,
  setModalVisible,
  confirmedTrip,
}: RenderOverlappingDatesProps) => {
  return overlappingDates.map((dateRange, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.overlappingDate,
        { backgroundColor: "#9BD4F4", borderColor: "#FFA500" },
      ]}
      onPress={() => {
        setSelectedTrip(dateRange);
        setModalVisible(true);
      }}
    >
      <Text style={styles.dateText}>
        {`${moment(dateRange.startDate).format("MM/DD")} - ${moment(
          dateRange.endDate
        ).format("MM/DD")}`}
        {` (${dateRange.numberOfDays}일)`}

        {" (날짜 선택)"}
      </Text>
    </TouchableOpacity>
  ));
};
export default renderOverlappingDates;
