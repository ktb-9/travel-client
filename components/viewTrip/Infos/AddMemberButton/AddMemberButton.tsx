import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface AddMemberButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

export const AddMemberButton: React.FC<AddMemberButtonProps> = ({
  onPress,
}) => (
  <TouchableOpacity
    style={styles.iconButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons name="person-add" size={18} color="#FFF" />
  </TouchableOpacity>
);
