import React from "react";
import { View, Text } from "react-native";

import { calculateBarWidth, formatPrice } from "@/utils/utils";
import { ProgressBar } from "./progressBar";
import { CommonExpense } from "@/types/payment/payment";
import { styles } from "./styles";

type CommonExpenseItemProps = {
  expense: CommonExpense;
  totalAmount: number;
};

export const CommonExpenseItem = ({
  expense,
  totalAmount,
}: CommonExpenseItemProps) => (
  <View style={styles.expenseItem}>
    <View style={styles.expenseHeader}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.expenseText}>{expense.category}</Text>
        {expense.to && (
          <View style={styles.toTag}>
            <Text style={styles.toTagText}>{expense.to}번에게</Text>
          </View>
        )}
      </View>
      <Text style={styles.expenseText}>{formatPrice(expense.price)}원</Text>
    </View>
    <ProgressBar
      category={expense.category}
      width={calculateBarWidth(expense.price, totalAmount)}
    />
  </View>
);
