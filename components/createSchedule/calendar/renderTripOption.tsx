import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import moment from "moment";
import "moment/locale/ko";
interface SelectedTrip {
  startDate: string;
  numberOfDays: number;
}

interface RenderTripOptionsProps {
  setModalVisible: (visible: boolean) => void;
  setConfirmedTrip: (trip: {
    startDate: string;
    endDate: string;
    nights: number;
  }) => void;
  selectedTrip: SelectedTrip | null;
}

const renderTripOptions = ({
  setModalVisible,
  setConfirmedTrip,
  selectedTrip,
}: RenderTripOptionsProps) => {
  if (!selectedTrip) return null;

  const maxDays = selectedTrip.numberOfDays;
  const options = [];

  for (let i = 1; i < maxDays; i++) {
    options.push(
      <TouchableOpacity
        key={i}
        style={styles.tripOption}
        onPress={() => {
          const startDate = selectedTrip.startDate;
          const endDate = moment(startDate).add(i, "days").format("YYYY-MM-DD");
          // 여행 일정 확정 처리 로직
          setConfirmedTrip({
            startDate,
            endDate,
            nights: i,
          });

          setModalVisible(false);
        }}
      >
        <Text style={styles.tripOptionText}>{`${i}박${i + 1}일`}</Text>
      </TouchableOpacity>
    );
  }

  return options;
};
export default renderTripOptions;
