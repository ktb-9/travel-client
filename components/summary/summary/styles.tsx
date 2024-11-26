import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f8f9fa",
  },
  contentWrapper: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  routeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  routeText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4E84FF",
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  dayInfo: {
    marginLeft: 12,
  },
  destinationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationCount: {
    fontSize: 14,
    color: "#666",
  },
  locationCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginLeft: 56,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  locationContent: {
    flexDirection: "row",
  },
  locationImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  locationTime: {
    fontSize: 14,
    color: "#666",
  },
  hashTag: {
    fontSize: 14,
    color: "#4E84FF",
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E84FF",
  },
  statNumberRed: {
    color: "#FF6B6B",
  },
  statNumberYellow: {
    color: "#FFB323",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
export default styles;
