import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  searchContainer: {
    position: "relative",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  searchResultsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapSelectButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  mapSelectButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  removeLocationButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#ff4444",
    borderRadius: 8,
    alignItems: "center",
  },
  removeLocationText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default styles;
