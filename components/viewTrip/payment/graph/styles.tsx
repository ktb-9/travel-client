import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#F8F9FA",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#868E96",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#212529",
  },
  sectionContainer: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#212529",
  },
  sectionTotal: {
    fontSize: 15,
    color: "#495057",
  },
  expenseItem: {
    marginBottom: 16,
  },
  expenseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  expenseText: {
    fontSize: 15,
    color: "#495057",
  },
  toTag: {
    backgroundColor: "#F1F3F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  toTagText: {
    fontSize: 12,
    color: "#868E96",
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#ccc",
  },
  progressFill: {
    height: "100%",
  },
});
