import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 160,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "#000", // ios 쉐도우
    shadowOffset: {
      width: 0,
      height: 4,
    },
    overflow: "hidden",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // 안드로이드 쉐도우
    color: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(76, 74, 74, 0.45)",
    borderRadius: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    alignItems: "center",
  },

  circleContainer: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  nickname: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    top: 60,
    left: 40,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  day: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  destination: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
});
export default styles;
