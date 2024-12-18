import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import styles from "./expense";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import getExpenseAnalysis from "@/hooks/api/getExpenseAnalysis";

const ExpenseAnalysis = () => {
  const tripId = useRecoilValue(tripIdState);
  const { data: expenseAnalysis } = getExpenseAnalysis(tripId);

  if (!expenseAnalysis) {
    return null;
  }

  const { totalExpense, categoryBreakdown, insights, memberExpenses } =
    expenseAnalysis.data;

  return (
    <View style={styles.container}>
      {/* 총 지출 카드 */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>총 지출</Text>
        <Text style={styles.totalAmount}>
          {totalExpense.toLocaleString()}원
        </Text>
      </View>

      {/* 카테고리별 지출 분석 */}
      <View style={styles.categoryCard}>
        <Text style={styles.sectionTitle}>카테고리별 지출</Text>
        {categoryBreakdown.map(
          (
            category: {
              color: string;
              percentage: number;
              category: string;
              amount: number;
            },
            index: number
          ) => (
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
          )
        )}
      </View>

      {/* 소비 인사이트 */}
      {insights.length > 0 && (
        <View style={styles.insightCard}>
          <Text style={styles.sectionTitle}>소비 패턴 인사이트</Text>
          {insights.map((insight: string, index: number) => (
            <View key={index} style={styles.insightItem}>
              <Text style={styles.insightDot}>•</Text>
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 멤버별 지출 현황 */}
      <View style={styles.memberCard}>
        <Text style={styles.sectionTitle}>멤버별 지출 분석</Text>
        {memberExpenses.map(
          (
            member: {
              nickname: string;
              percentage: number;
              paidAmount: number;
            },
            index: number
          ) => (
            <View key={index} style={styles.memberItem}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.nickname}</Text>
                <Text style={styles.memberPercentage}>
                  {member.percentage}% 지출
                </Text>
              </View>
              <View style={styles.memberAmounts}>
                <Text style={styles.memberPaid}>
                  {member.paidAmount.toLocaleString()}원
                </Text>
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default ExpenseAnalysis;
