import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    width: "100%",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 16,
    marginTop: 12,
    fontWeight: "500",
  },
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  tripIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tripName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  tripDetails: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 8,
    fontWeight: "500",
  },
  createdText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    marginTop: 4,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    padding: 6,
  },
  buttonText: {
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 4,
    fontWeight: "500",
  },
});

export default styles;
