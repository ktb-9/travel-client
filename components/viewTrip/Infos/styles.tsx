import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: height,
  },
  background: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(76, 74, 74, 0.45)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    alignItems: "center",
    gap: 15,
  },
  circleContainer: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  nickname: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  day: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  planContainer: {
    width: "100%",
    height: 600,
  },
  membersContainer: {
    position: "absolute",
    bottom: 56,
    left: 10,
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    width: "auto",
  },
  memberProfileContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 2,
    borderColor: "white",
  },
  memberProfileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  memberCountBadge: {
    backgroundColor: "#007bff",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: "auto",
  },
  memberCountText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,

    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
});

export default styles;
