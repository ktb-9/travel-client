import { StyleSheet } from "react-native";
const CARD_PADDING = 20;

const styles = StyleSheet.create({
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 13,
    paddingLeft: CARD_PADDING,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dayInfo: {
    flex: 1,
  },
  dayText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },

  destinationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  destinationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 13,
    color: "#0679C0",
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A40F4",
    padding: 10,
    width: "auto",
    borderRadius: 13,
    marginTop: 16,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoBold",
  },
});
export default styles;
