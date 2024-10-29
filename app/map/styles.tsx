import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    zIndex: 1,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  resultsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 150 : 80,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    maxHeight: 400,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  resultsList: {
    maxHeight: 400,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastResultItem: {
    borderBottomWidth: 0,
  },
  resultIconContainer: {
    width: 30,
    alignItems: "center",
  },
  resultTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  placeName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  roadAddressText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  searchingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  searchingText: {
    marginLeft: 10,
    color: "#666",
    fontSize: 14,
  },
  map: {
    flex: 1,
  },
  currentLocationButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
    marginTop: -1,
  },
});
export default styles;