import { StyleSheet } from "react-native";

const CELL_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2c",
  },
  calendar: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
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
    opacity: 0.8,
  },
  firstIndicator: {
    marginLeft: 0,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
});

export default styles;
