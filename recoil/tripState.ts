import { atom } from "recoil";
interface tripProps {
  trip: string;
}
export const tripState = atom<tripProps>({
  key: "tripState",
  default: {
    trip: "",
  },
});
