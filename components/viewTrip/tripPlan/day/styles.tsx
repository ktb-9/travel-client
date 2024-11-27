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

  emptyLocationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  emptyLocationsText: {
    marginTop: 10,
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
