import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "100%", // 변경됨
    height: 250,
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 30, // 추가됨
  },
  box: {
    width: width * 0.42, // 화면 너비의 40%
    borderBlockColor: "black",
    borderRadius: 25,
    marginRight: 20, // 추가됨
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
    bottom: 16,
    left: 16,
    right: 16,
  },
  hashTag: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mainTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subTitle: {
    color: "#E5E5E5",
    fontSize: 12,
  },
});
export default styles;
