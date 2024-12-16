import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  totalCard: {
    backgroundColor: "#4E84FF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  totalLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    marginBottom: 8,
  },
  totalAmount: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  categoryCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    marginBottom: 8,
  },
  categoryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    flex: 1,
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  categoryAmount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f1f3f5",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  insightCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  insightItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  insightDot: {
    marginRight: 8,
    color: "#4E84FF",
    fontSize: 16,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  memberCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  memberAmounts: {
    flex: 1,
    paddingLeft: 16,
  },
  memberPaid: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginBottom: 2,
  },
  memberShould: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginBottom: 4,
  },
  memberBalance: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
  // 기존 memberInfo 수정
  memberInfo: {
    flex: 1,
  },
  // 기존 memberItem 수정
  memberItem: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  // 기존 memberName 수정
  memberName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  memberPercentage: {
    fontSize: 14,
    color: "#666",
  },
  memberAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
export default styles;
