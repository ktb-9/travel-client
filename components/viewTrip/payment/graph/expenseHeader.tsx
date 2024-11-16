import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { formatPrice } from "@/utils/utils";

type ExpenseHeaderProps = {
  title: string;
  amount: number;
};

export const ExpenseHeader = ({ title, amount }: ExpenseHeaderProps) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionTotal}>{formatPrice(amount)}원</Text>
  </View>
);
