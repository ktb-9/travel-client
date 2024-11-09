import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "90%", // React Native에서는 px를 생략합니다
    height: 380,
    backgroundColor: "#FFFFFF",
    shadowColor: "#E5E8F5", // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 오프셋
    shadowOpacity: 1, // 그림자 불투명도
    shadowRadius: 30, // 그림자 퍼짐 정도
    elevation: 10, // 안드로이드 그림자 높이
    borderRadius: 30,
  },

  box: {
    width: width * 0.42, // 화면 너비의 40%
    borderBlockColor: "black",
    borderRadius: 25,
    height: 250,
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
  header1: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 23,
    fontFamily: "robotoBold",
    fontWeight: "bold",
  },
  header2: {
    position: "relative",
    marginLeft: 15,
    top: 8,
    width: 120,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "robotoBold",
    color: "#747476",
  },
});
export default styles;
