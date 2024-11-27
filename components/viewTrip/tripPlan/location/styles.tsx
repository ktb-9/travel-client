import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },

  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  hashtagBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  hashtagText: {
    fontSize: 14,
    color: "#1A9EC7",
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  pencilContainer: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  pencil: {
    padding: 20,
  },
});

export default styles;
