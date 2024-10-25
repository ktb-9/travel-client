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
});
export default styles;
