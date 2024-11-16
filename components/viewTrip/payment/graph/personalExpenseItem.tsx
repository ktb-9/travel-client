import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { PersonalExpense } from "@/types/payment/payment";
import { calculateBarWidth, formatPrice } from "@/utils/utils";
import { ProgressBar } from "./progressBar";

type PersonalExpenseItemProps = {
  expense: PersonalExpense;
  totalAmount: number;
};

export const PersonalExpenseItem = ({
  expense,
  totalAmount,
}: PersonalExpenseItemProps) => (
  <View style={styles.expenseItem}>
    <View style={styles.expenseHeader}>
      <Text style={styles.expenseText}>{expense.category}</Text>
      <Text style={styles.expenseText}>{formatPrice(expense.total)}원</Text>
    </View>
    <ProgressBar
      category={expense.category}
      width={calculateBarWidth(expense.total, totalAmount)}
    />
  </View>
);
