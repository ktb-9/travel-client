import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 250,

    display: "flex",
    gap: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  box: {
    width: 185,
    borderBlockColor: "black",
    borderRadius: 25,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(76, 74, 74, 0.35)",
    borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    borderColor: "black",
    alignItems: "center", // 추가
    justifyContent: "center",
    zIndex: 999999,
    gap: 4,
  },
  mainTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    color: "#E5E5E5",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
  icon: {
    width: 25,
    height: 25,
  },
});
export default styles;
