import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  categoryBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: -0.3,
  },
  visitTime: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
});
export default styles;
