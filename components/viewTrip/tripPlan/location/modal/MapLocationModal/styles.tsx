import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mapSearchContainer: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  mapSearchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  mapSearchResultsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapSearchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  mapSearchResultText: {
    fontSize: 16,
    color: "#333",
  },
  mapSearchResultSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  closeMapButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
export default styles;
