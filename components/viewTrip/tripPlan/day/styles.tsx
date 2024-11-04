import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const CARD_PADDING = 20;

const styles = StyleSheet.create({
  dayContainer: {
    width: width,
    height: "100%",
  },
  scrollContent: {
    padding: CARD_PADDING,
  },
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
  locationsContainer: {
    flex: 1,
  },
  locationWrapper: {
    marginBottom: 16,
  },
  connector: {
    alignItems: "center",
    height: 32,
    justifyContent: "center",
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
});

export default styles;
