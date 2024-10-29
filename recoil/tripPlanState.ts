// types.ts
interface Location {
  name: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface DayPlan {
  day: number;
  destination: string;
  locations: Location[];
}

interface TripPlan {
  days: DayPlan[];
}

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
