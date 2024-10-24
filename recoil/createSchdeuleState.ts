import { atom } from "recoil";

export const createSchdeuleState = atom({
  key: "createSchedule",
  default: {
    groupId: 0,
    groupName: "",
    date: "",
  },
});
