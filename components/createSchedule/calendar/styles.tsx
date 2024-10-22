import { StyleSheet } from "react-native";

const CELL_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    padding: 10,
    marginTop: -50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#585454",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#2c2c2c",
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayText: {
    color: "white",
    fontSize: 12,
  },
  sundayText: {
    color: "red",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  cellText: {
    color: "white",
    fontSize: 14,
  },
  disabledText: {
    color: "gray",
  },
  today: {
    backgroundColor: "#4CAF50",
  },
  todayText: {
    color: "white",
    fontWeight: "bold",
  },
  sunday: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  selectedCell: {
    backgroundColor: "rgba(0, 122, 255, 0.2)",
  },
  rangeStart: {
    backgroundColor: "rgba(0, 122, 255, 0.8)",
  },
  rangeEnd: {
    backgroundColor: "rgba(0, 122, 255, 0.8)",
  },
  selectedText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  pressedCell: {
    backgroundColor: "rgba(0, 122, 255, 0.4)",
  },
  // 새로 추가된 다중 사용자 관련 스타일
  userIndicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
  },
  userIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  firstIndicator: {
    marginLeft: 0,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#2c2c2c",
    marginTop: 10,
    borderRadius: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "white",
  },

  overlappingDatesContainer: {
    marginTop: 20,
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overlappingDate: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tripOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tripOptionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
  },
  confirmedTripContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#18D9BC",
    borderRadius: 8,
  },
  confirmedTripText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default styles;
