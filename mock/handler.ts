// mock/axios-mock.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { historyType, upCommingState } from "@/types/common/main";
import { inviteDataState } from "@/types/createSchedule/createSchedule";
import { historyData, upCommingData } from "./data/common/main";
import { inviteData } from "./data/createSchedule.ts/createSchedule";

const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

mock.onGet("/api/upcomming").reply<upCommingState>(200, {
  data: upCommingData,
});
mock.onGet("/api/hotplace").reply<historyType>(200, { data: historyData });
mock.onGet("/api/invite").reply<inviteDataState>(200, {
  data: inviteData,
});
export default mock;
