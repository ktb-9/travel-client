import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  searchResultsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    maxHeight: 200,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultsList: {
    padding: 8,
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  addressName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: "#999",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
    fontSize: 14,
  },
});
export default styles;
