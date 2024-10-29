import { atom } from "recoil";
interface dayProps {
  day: number;
}
export const dayState = atom<dayProps>({
  key: "dayState",
  default: {
    day: 0,
  },
});
