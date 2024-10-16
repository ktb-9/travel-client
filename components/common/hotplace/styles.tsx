import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    width: "90%", // React Native에서는 px를 생략합니다
    height: 650,
    backgroundColor: "#FFFFFF",
    shadowColor: "#E5E8F5", // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 오프셋
    shadowOpacity: 1, // 그림자 불투명도
    shadowRadius: 30, // 그림자 퍼짐 정도
    elevation: 10, // 안드로이드 그림자 높이
    borderRadius: 30,
    gap: 7,
    display: "flex",
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 23,
    fontFamily: "robotoBold",
  },
  comment: {
    marginLeft: 20,
    width: 100,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "robotoBold",
    color: "#747476",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    width: "100%",
    height: 525,
    gap: 15,
    borderRadius: 30,
  },
  grid23: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "45%",
    height: "60%",
  },

  box: {
    width: "42%",
    height: 350,
    borderBlockColor: "black",
    borderRadius: 20,
  },
  box2: {
    width: "100%",
    borderBlockColor: "black",
    height: 170,
    borderRadius: 25,
  },
  box3: {
    position: "absolute",
    bottom: 0,
    width: "90%",
    borderBlockColor: "black",
    height: 160,
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
