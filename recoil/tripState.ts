import { groupState, tripState } from "@/types/viewTrip/viewTrip";
import { atom } from "recoil";

export const locationState = atom<tripState>({
  key: "locationState",
  default: {
    groupThumbnail: "",
    groupName: "",
    date: "",
    days: [
      {
        day: 0,
        destination: "",
        locations: [
          {
            name: "",
            address: "",
            visitTime: "",
            thumbnail: "",
            category: "",
            hashtag: "",
          },
        ],
      },
    ],
  },
});
