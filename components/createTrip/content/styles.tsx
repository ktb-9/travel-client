import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 10,
  },
  title: {
    display: "flex",
    gap: 5,
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
  groupNameWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  edit: {
    color: "#B5BEC6",
    fontWeight: "bold",
  },
});
export default styles;
