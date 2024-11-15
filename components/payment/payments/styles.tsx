import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: 300,
    gap: 20,
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
  },
  inputContainer: {
    gap: 16,
  },
  categoryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  categoryButtonText: {
    color: "#999",
    fontSize: 16,
  },
  dropdownIcon: {
    color: "#999",
  },
  bankInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
    fontSize: 16,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  dateText: {
    color: "#999",
    fontSize: 16,
  },
  calendarIcon: {
    fontSize: 20,
  },
  amountInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
    fontSize: 16,
  },
  nBbangSection: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  nBbangTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  userContainer: {
    gap: 12,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
  },
  checkContainer: {
    position: "relative",
    top: -15,
    flexDirection: "row",
    gap: 15,
    height: 24, // 체크 원의 높이와 동일하게 설정
    alignItems: "center", // 수직 중앙 정렬
  },
  checkItem: {
    alignItems: "center",
    gap: 5,
  },
  checkLabel: {
    fontSize: 14,
    lineHeight: 24, // 체크 원의 높이와 동일하게 설정
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#007AFF",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  addButtonText: {
    fontSize: 32,
    color: "#007AFF",
  },
  submitWrapper: {
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    width: 100,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 40,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  checked: {
    width: "100%",
    height: "100%",
  },
});
export default styles;
