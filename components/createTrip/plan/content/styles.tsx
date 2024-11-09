import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  destinationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  destinationIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  destinationInput: {
    flex: 1,
    fontFamily: "NotoSans",
    fontSize: 18,
    fontWeight: "bold",
    color: "#585454",
  },
  dayText: {
    fontFamily: "RobotoBold",
    fontSize: 16,
    color: "#585454",
    marginBottom: 12,
  },
  locationContainer: {
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
    padding: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationInput: {
    flex: 1,
    fontFamily: "NotoSans",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    marginRight: 8,
  },
  locationsList: {
    maxHeight: 240,
  },
});

export default styles;
