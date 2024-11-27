import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  locationCard: {
    backgroundColor: "white",
    borderRadius: 32,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },

  imageContainer: {
    position: "relative",
  },
  locationImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },

  actionButtonsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 59, 48, 0.7)",
    padding: 8,
    borderRadius: 20,
  },

  locationContent: {
    padding: 24,
  },
});
export default styles;
