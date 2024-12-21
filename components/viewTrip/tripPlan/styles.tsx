import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  addDayButton: {
    position: "absolute",
    top: -45,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    backgroundColor: "black",
    borderRadius: 10,
  },
  addDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
