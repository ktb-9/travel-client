import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  kakaoButton: {
    padding: 15,
    borderRadius: 30,
    width: "80%", // 버튼 너비
    alignItems: "center",
    overflow: "hidden",
  },
  buttonText: {
    color: "#000", // 텍스트 색상 추가 (선택 사항)
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  kakaoImage: {
    width: "100%", // 버튼 너비에 맞춤
    height: 40, // 버튼 높이에 맞춤
  },
});
export default styles;
