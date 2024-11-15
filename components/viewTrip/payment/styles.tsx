import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    borderWidth: 2,
    width: "100%",
  },
  header: {
    fontFamily: "NotoBold",
    fontSize: 20,
  },
  wrapper: {
    width: "100%",
    height: 400,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
  },
});

export default styles;
