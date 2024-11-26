import { Text, View } from "react-native";
import styles from "./styles";
import { RenderHeaderProps } from "@/types/calendar/calendar";
import Button from "@/components/common/Button/button";

const renderHeader = ({ onPressArrow, currentMonth }: RenderHeaderProps) => (
  <View style={styles.header}>
    <Button
      testID="prev-month-button"
      variant="arrow"
      title="<"
      onPress={() => onPressArrow(-1)}
    />
    <Text style={styles.headerText}>{currentMonth.format("YYYY년 M월")}</Text>
    <Button
      testID="prev-month-button"
      variant="arrow"
      title=">"
      onPress={() => onPressArrow(1)}
    />
  </View>
);
export default renderHeader;
