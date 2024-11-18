import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "90%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  errorText: {
    fontFamily: "NotoMedium",
    fontSize: 16,
    color: "#FF4B4B",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  header: {
    fontFamily: "NotoBold",
    fontSize: 24,
    color: "#191F28",
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 22,
    backgroundColor: "#F2F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});

export default styles;
