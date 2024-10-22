import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import moment from "moment";
import "moment/locale/ko";

interface DateRange {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}

interface ConfirmedTrip {
  startDate: string;
  endDate: string;
  nights: number;
}
interface RenderOverlappingDatesProps {
  overlappingDates: DateRange[];
  setSelectedTrip: (trip: DateRange) => void;
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
