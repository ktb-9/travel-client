import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
  },
});

export default styles;
