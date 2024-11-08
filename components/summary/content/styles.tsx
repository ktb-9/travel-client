import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: height,
  },
  background: {
    width: "100%",
    height: 400,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(76, 74, 74, 0.45)",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  planContainer: {
    flex: 1,
  },
});

export default styles;
