import React from "react";
import { View, Text, TextInput } from "react-native";
import { FormFieldProps } from "@/types/viewTrip/viewTrip";
import styles from "./styles";

export const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  children,
}: FormFieldProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {children}
    </View>
  );
};
