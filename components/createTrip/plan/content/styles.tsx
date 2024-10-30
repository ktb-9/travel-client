import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  destinationWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  destinationLogo: {
    width: 30,
    height: 30,
  },
  trip: {
    width: 200,
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "bold",
    color: "#585454",
  },
  destination: {
    fontFamily: "NotoSans",
    fontSize: 25,
    fontWeight: "bold",
    color: "#585454",
  },
  edit: {
    color: "#B5BEC6",
    fontWeight: "bold",
  },
  day: {
    fontFamily: "robotoBold",
    fontSize: 18,
    padding: 15,
  },
  locationContainer: {
    borderWidth: 2,
    borderColor: "#EBEBEB",
    width: "90%",
    alignItems: "center",
    height: 300,
  },
  inputWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: "75%",
    borderBottomWidth: 2,
    height: 20,
    borderColor: "#EBEBEB",
  },
  marker: {
    width: 20,
    height: 20,
    objectFit: "contain",
  },
  resultIconContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  resultTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  resultItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  lastResultItem: {
    borderBottomWidth: 0,
  },
  resultsList: {
    width: "100%",
  },
  itemLeftContent: {
    flexDirection: "row",
    flex: 1,
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
    padding: 4,
  },
});
export default styles;
