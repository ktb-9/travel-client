import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    alignItems: "center",
    gap: 15,
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
  image: {
    width: "100%",
    height: "100%",
  },
  nickname: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  day: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default styles;
