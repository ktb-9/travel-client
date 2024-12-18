import { atom } from "recoil";

const groupIdState = atom<number>({
  key: "groupIdState",
  default: 0,
});
export default groupIdState;
