import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    gap: 20,
    alignItems: "center",
  },
  buttonWrapper: {
    width: "100%",
    marginLeft: "20%",
  },
  addCompanion: {
    backgroundColor: "#A7F1ED",
    width: 70,
    height: 25,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 11 },
  invitedWrapper: {
    width: "80%",
    height: 300,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBlockColor: "#E4E4E4",
    display: "flex",
    alignItems: "center",
  },
  listWrapper: {
    marginTop: 30,
    width: width * 0.6,
    borderWidth: 2,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default styles;
