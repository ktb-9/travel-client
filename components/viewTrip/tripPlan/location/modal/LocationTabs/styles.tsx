import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  locationTabs: {
    flexDirection: "row",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  locationTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  activeLocationTab: {
    backgroundColor: "#4A90E2",
  },
  locationTabText: {
    color: "#333",
  },
  addLocationButton: {
    padding: 8,
  },
});
export default styles;
