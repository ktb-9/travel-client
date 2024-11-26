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
  pencilContainer: {
    position: "absolute",
    top: -30,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A40F4",
    padding: 10,
    width: "auto",
    borderRadius: 13,
    marginTop: 16,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoBold",
  },
});

export default styles;
