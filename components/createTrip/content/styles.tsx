import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 40,
    borderWidth: 2,
  },
  title: {
    display: "flex",
    gap: 5,
    borderWidth: 2,
    width: "100%",
    padding: 10,
  },
  groupName: {
    fontFamily: "NotoSans",
    fontSize: 30,
    fontWeight: "bold",
    color: "#585454",
  },
  date: {
    fontFamily: "robotoBold",
    color: "#939393",
    fontWeight: "bold",
  },
});
export default styles;
