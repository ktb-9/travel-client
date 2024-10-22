import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface RenderHeaderProps {
  onPressArrow: (direction: number) => void;
  currentMonth: moment.Moment;
}

const renderHeader = ({ onPressArrow, currentMonth }: RenderHeaderProps) => (
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
export default renderHeader;
