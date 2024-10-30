import { TripPlan } from "@/types/createTrip/createTrip";
import { atom } from "recoil";

export const tripPlanState = atom<TripPlan>({
  key: "tripPlanState",
  default: {
    days: [
      {
        day: 1,
        destination: "",
        locations: [],
      },
    ],
  },
});
