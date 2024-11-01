import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  lastResultItem: {
    borderBottomWidth: 0,
  },
  itemLeftContent: {
    flexDirection: "row",
    flex: 1,
  },
  resultIconContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  resultTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  locationName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  locationAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  visitTime: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  deleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default styles;
