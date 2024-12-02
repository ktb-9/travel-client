import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  backgroundGrid: {
    justifyContent: "center",
  },
  backgroundOption: {
    margin: 5,
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
  },
  backgroundOptionImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  customBackgroundButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  customBackgroundButtonText: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});
export default styles;
