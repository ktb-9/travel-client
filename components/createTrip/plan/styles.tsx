import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    marginBottom: 16,
  },
  contentWrapper: {
    gap: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  addButtonText: {
    fontFamily: "RobotoBold",
    fontSize: 16,
    color: "#7C7C7C",
  },
  submitButton: {
    marginTop: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#6CD99E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontFamily: "RobotoBold",
    fontSize: 14,
    color: "#fff",
  },
});

export default styles;
