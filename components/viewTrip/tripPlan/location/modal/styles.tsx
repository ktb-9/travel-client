import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    height: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 5,
  },
  form: {
    padding: 20,
  },
  imagePickerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: "#666",
  },
  inputGroup: {
    marginBottom: 20,
    position: "relative",
  },
  searchContainer: {
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  submitButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
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
  locationTabs: {
    flexDirection: "row",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  locationTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  activeLocationTab: {
    backgroundColor: "#4A90E2",
  },
  locationTabText: {
    color: "#333",
  },
  activeLocationTabText: {
    color: "#fff",
  },
  addLocationButton: {
    padding: 8,
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
