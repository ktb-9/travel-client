import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "85%",
    marginBottom: 100,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    gap: 40,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBlockColor: "#E4E4E4",
    width: "80%",
    height: 40,
  },
});
export default styles;
