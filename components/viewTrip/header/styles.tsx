import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    width: "100%",
    zIndex: 9999,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "NotoBold",
  },

  backButton: {
    width: 30,
  },
});
export default styles;
