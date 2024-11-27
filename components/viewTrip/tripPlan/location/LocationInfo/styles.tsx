import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  locationHeader: {
    marginBottom: 12,
  },
  locationName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.7,
    lineHeight: 32,
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 15,
    color: "#6B7280",
    letterSpacing: -0.3,
    lineHeight: 22,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 16,
  },
  address: {
    fontSize: 15,
    color: "#4B5563",
    marginLeft: 6,
    flex: 1,
    fontWeight: "500",
    letterSpacing: -0.3,
  },
});
export default styles;
