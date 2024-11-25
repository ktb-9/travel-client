import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  primaryButton: {
    width: 90,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#B66CD9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#A7F1ED",
    width: 70,
    height: 25,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 11,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  iconButton: {
    backgroundColor: "transparent",
  },

  outlineText: {
    color: "#007AFF",
  },
  // Disabled styles
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#A0A0A0",
  },

  arrowButton: {
    padding: 10,
  },
  arrowText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default styles;
