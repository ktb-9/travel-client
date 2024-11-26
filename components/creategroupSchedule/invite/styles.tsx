import { StyleSheet } from "react-native";

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

  invitedWrapper: {
    padding: 30,
    width: "80%",
    height: 250,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBlockColor: "#E4E4E4",
    display: "flex",
    alignItems: "center",
  },
  listWrapper: {
    width: "100%",
    gap: 20,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContents: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    width: "100%",
  },
  profile: {
    borderRadius: 10,
    width: 40,
    height: 40,
  },
  name: {},
  lead: { width: 16, height: 16 },
});
export default styles;
