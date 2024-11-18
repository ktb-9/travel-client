import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import styles from "./expense";

// 분석용 데이터 구조
export const expenseAnalysis = {
  totalExpense: 296500,
  categoryBreakdown: [
    {
      category: "술",
      amount: 190000,
      percentage: 64.1,
      count: 2,
      trend: "증가",
      color: "#FF6B6B",
    },
    {
      category: "카페",
      amount: 100000,
      percentage: 33.7,
      count: 1,
      trend: "유지",
      color: "#4ECDC4",
    },
    {
      category: "간식",
      amount: 3000,
      percentage: 1.0,
      count: 2,
      trend: "감소",
      color: "#FFB323",
    },
    {
      category: "주스",
      amount: 3500,
      percentage: 1.2,
      count: 1,
      trend: "유지",
      color: "#95A5A6",
    },
  ],
  insights: [
    "술 카테고리가 전체 지출의 64%를 차지하고 있어요",
    "카페에서 한 번에 많은 금액을 지출했어요",
    "간식은 소액으로 자주 구매했네요",
  ],
  memberExpenses: [
    {
      memberId: 1,
      paidAmount: 196500,
      percentage: 66.3,
    },
    {
      memberId: 2,
      paidAmount: 100000,
      percentage: 33.7,
    },
  ],
};

const ExpenseAnalysis = () => {
  return (
    <View style={styles.container}>
      {/* 총 지출 카드 */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>총 지출</Text>
        <Text style={styles.totalAmount}>
          {expenseAnalysis.totalExpense.toLocaleString()}원
        </Text>
      </View>

      {/* 카테고리별 지출 분석 */}
      <View style={styles.categoryCard}>
        <Text style={styles.sectionTitle}>카테고리별 지출</Text>
        {expenseAnalysis.categoryBreakdown.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitleRow}>
                <View
                  style={[
                    styles.categoryDot,
                    { backgroundColor: category.color },
                  ]}
                />
                <Text style={styles.categoryName}>{category.category}</Text>
                <Text style={styles.categoryPercentage}>
                  {category.percentage}%
                </Text>
              </View>
              <Text style={styles.categoryAmount}>
                {category.amount.toLocaleString()}원
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* 소비 인사이트 */}
      <View style={styles.insightCard}>
        <Text style={styles.sectionTitle}>소비 패턴 인사이트</Text>
        {expenseAnalysis.insights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <Text style={styles.insightDot}>•</Text>
            <Text style={styles.insightText}>{insight}</Text>
          </View>
        ))}
      </View>

      {/* 멤버별 지출 현황 */}
      <View style={styles.memberCard}>
        <Text style={styles.sectionTitle}>멤버별 지출</Text>
        {expenseAnalysis.memberExpenses.map((member, index) => (
          <View key={index} style={styles.memberItem}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>멤버 {member.memberId}</Text>
              <Text style={styles.memberPercentage}>{member.percentage}%</Text>
            </View>
            <Text style={styles.memberAmount}>
              {member.paidAmount.toLocaleString()}원
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ExpenseAnalysis;
