import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
interface LeaveRoomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}
export const LeaveRoomButton: React.FC<LeaveRoomButtonProps> = ({
  onPress,
}) => (
  <TouchableOpacity
    style={styles.iconButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons name="exit-outline" size={18} color="#FFF" />
  </TouchableOpacity>
);
