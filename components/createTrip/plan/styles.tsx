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
  header: {
    width: "100%",
    padding: 10,
  },
  headerTitle: {
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "bold",
    color: "#585454",
  },
  content: {
    display: "flex",
  },
});
export default styles;
