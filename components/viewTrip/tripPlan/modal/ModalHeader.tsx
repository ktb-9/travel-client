import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { ModalHeaderProps } from "@/types/viewTrip/viewTrip";

export const ModalHeader = ({ onClose, onSave, title }: ModalHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <MaterialIcons name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
