import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
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
  contentWraper: {
    borderWidth: 2,
    width: width * 0.9,
    display: "flex",
    gap: 20,
  },
  plusBtn: {
    width: 30,
    height: 30,
  },
});
export default styles;
