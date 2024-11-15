import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  locationCard: {
    backgroundColor: "white",
    borderRadius: 32,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  imageContainer: {
    position: "relative",
  },
  locationImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  badgeContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  categoryBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: -0.3,
  },
  locationContent: {
    padding: 24,
  },
  locationHeader: {
    marginBottom: 12,
  },
  locationName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.7,
    lineHeight: 32,
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 15,
    color: "#6B7280",
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  visitTime: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 16,
  },
  address: {
    fontSize: 15,
    color: "#4B5563",
    marginLeft: 6,
    flex: 1,
    fontWeight: "500",
    letterSpacing: -0.3,
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

  actionButtonsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 59, 48, 0.7)",
  },

  footerContainer: {
    padding: 10,
  },
  footerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 16,
    gap: 8,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: -0.3,
  },
});

export default styles;
