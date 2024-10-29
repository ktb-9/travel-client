import { atom } from "recoil";
interface Location {
  locations: string[];
  day: number;
}
export const locationState = atom<Location[]>({
  key: "locations",
  default: [],
});
