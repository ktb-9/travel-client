import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: height,
    alignItems: "center",
    gap: 40,
    borderWidth: 2,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBlockColor: "#E4E4E4",
    width: "80%",
    height: 40,
  },
});
export default styles;
