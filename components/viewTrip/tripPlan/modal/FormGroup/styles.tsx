import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    zIndex: 1, // Added for search results positioning
  },
  searchInputGroup: {
    marginBottom: 20,
    zIndex: 2, // Higher z-index for search field
  },
});
export default styles;
