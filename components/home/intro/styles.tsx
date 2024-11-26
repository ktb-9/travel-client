import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    height: 450,
  },
  logo: {
    width: "67%",
    height: 290,
    objectFit: "contain",
  },
  mainTitle: {
    fontFamily: "NotoBlack",
    fontSize: 25,
  },
  subTitle: {
    color: "#747476",
    fontFamily: "robotoBold",
  },
});
export default styles;
