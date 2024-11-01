import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  addPlan: {},
  button: {
    padding: 5,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;
