import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  groupName: {
    fontFamily: "NotoSans",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  editText: {
    fontFamily: "RobotoBold",
    fontSize: 14,
    color: "#7C7C7C",
  },
  date: {
    fontFamily: "RobotoBold",
    fontSize: 16,
    color: "#7C7C7C",
  },
});

export default styles;
