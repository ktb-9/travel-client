import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import {
  CommonExpense,
  ExpenseResult,
  PersonalExpense,
} from "@/types/payment/payment";
import { formatPrice } from "@/utils/utils";
import { ExpenseHeader } from "./expenseHeader";
import { PersonalExpenseItem } from "./personalExpenseItem";
import { CommonExpenseItem } from "./commonExpenseItem";

type GraphProps = {
  data: ExpenseResult[];
};

const Graph = ({ data }: GraphProps) => {
  const { personalExpenses, commonExpenses } = useMemo(() => {
    return data.reduce(
      (acc, cur) => {
        const hasCommon = cur.details.some((detail) => detail.type === "공통");
        if (hasCommon) {
          const commonDetails = cur.details
            .filter((detail) => detail.type === "공통")
            .map((detail) => ({
              category: cur.category,
              price: detail.price,
              to: detail.to,
            }));
          return {
            ...acc,
            commonExpenses: [...acc.commonExpenses, ...commonDetails],
          };
        } else {
          return {
            ...acc,
            personalExpenses: [
              ...acc.personalExpenses,
              {
                category: cur.category,
                total: cur.total,
              },
            ],
          };
        }
      },
      {
        personalExpenses: [] as PersonalExpense[],
        commonExpenses: [] as CommonExpense[],
      }
    );
  }, [data]);

  const totalPersonalAmount = useMemo(
    () => personalExpenses.reduce((sum, item) => sum + item.total, 0),
    [personalExpenses]
  );

  const totalCommonAmount = useMemo(
    () => commonExpenses.reduce((sum, item) => sum + item.price, 0),
    [commonExpenses]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>이번 여행 총 나의 지출</Text>
        <Text style={styles.headerTitle}>
          {formatPrice(totalPersonalAmount + totalCommonAmount)}원
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        {personalExpenses.length > 0 && (
          <View style={{ marginBottom: 32 }}>
            <ExpenseHeader title="개인 지출" amount={totalPersonalAmount} />
            {personalExpenses.map((expense) => (
              <PersonalExpenseItem
                key={expense.category}
                expense={expense}
                totalAmount={totalPersonalAmount}
              />
            ))}
          </View>
        )}

        {commonExpenses.length > 0 && (
          <View>
            <ExpenseHeader title="공동 지출" amount={totalCommonAmount} />
            {commonExpenses.map((expense, index) => (
              <CommonExpenseItem
                key={`${expense.category}-${index}`}
                expense={expense}
                totalAmount={totalCommonAmount}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Graph;
