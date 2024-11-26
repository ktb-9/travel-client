import { atom } from "recoil";

const tripIdState = atom<number>({
  key: "tripIdState",
  default: 0,
});
export default tripIdState;
