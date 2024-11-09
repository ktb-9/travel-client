import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import { addFormFieldProps } from "@/types/viewTrip/viewTrip";

export const FormField: React.FC<addFormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  editable = true,
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>
      {label} {required && "*"}
    </Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
    />
  </View>
);
