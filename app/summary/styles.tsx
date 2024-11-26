import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    display: "flex",
    width: width,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  endTrip: {
    borderRadius: 20,
    backgroundColor: "blue",
    width: 90,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  endText: {
    fontFamily: "NotoBold",
    fontSize: 13,
    color: "#fff",
  },
});
export default styles;
