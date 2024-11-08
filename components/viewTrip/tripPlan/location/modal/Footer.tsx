import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { FooterProps } from "@/types/viewTrip/viewTrip";

export const Footer: React.FC<FooterProps> = ({ onCancel, onSubmit }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
      <Text style={styles.cancelButtonText}>취소</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitButtonText}>추가하기</Text>
    </TouchableOpacity>
  </View>
);
