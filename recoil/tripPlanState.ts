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
  groupId: number;
  groupName: string;
  date: string;
  days: DayPlan[];
}

import { atom } from "recoil";

export const tripPlanState = atom<TripPlan>({
  key: "tripPlanState",
  default: {
    groupId: 1,
    groupName: "",
    date: "",
    days: [
      {
        day: 1,
        destination: "",
        locations: [],
      },
    ],
  },
});
