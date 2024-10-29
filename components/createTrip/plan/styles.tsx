import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 40,

    marginBottom: 50,
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
    width: width * 0.9,
    display: "flex",
    gap: 20,
  },
  plusBtn: {
    width: 30,
    height: 30,
  },
  submit: {
    width: 90,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#6CD99E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
export default styles;
