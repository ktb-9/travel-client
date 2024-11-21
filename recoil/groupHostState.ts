import { atom } from "recoil";
interface groupState {
  group_id: number;
  host_id: number;
}
const groupHostState = atom<groupState>({
  key: "groupHostState",
  default: { group_id: 0, host_id: 0 }, // 초기값 설정
});
export default groupHostState;
