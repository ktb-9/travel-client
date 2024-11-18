// mock/axios-mock.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { historyType, upCommingState } from "@/types/common/main";
import { inviteDataState } from "@/types/createSchedule/createSchedule";
import { historyData, upCommingData } from "./data/common/main";
import { inviteData } from "./data/createSchedule.ts/createSchedule";
import { tripData } from "./data/trip/trip";
import { getPayments } from "./data/payment/payment";

const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

mock.onGet("/api/upcomming").reply<upCommingState>(200, {
  data: upCommingData,
});
mock.onGet("/api/hotplace").reply<historyType>(200, { data: historyData });
mock.onGet("/api/invite").reply<inviteDataState>(200, {
  data: inviteData,
});

mock.onPost("/api/schedule").reply(200, {
  message: "성공적으로 저장되었습니다.",
});
mock.onGet("/api/trip/1").reply(200, {
  data: tripData,
});
mock.onPut("/api/trip/1").reply(200, {
  message: "성공적으로 수정되었습니다.",
});
mock.onPost("/api/trip").reply(200, {
  message: "성공적으로 저장되었습니다.",
});
mock.onDelete("/api/trip/1").reply(200, {
  message: "성공적으로 삭제되었습니다.",
});

mock.onPost("/api/payment").reply(200, {
  message: "성공적으로 저장되었습니다.",
});
mock.onGet("/api/payment/1").reply(200, {
  data: getPayments,
});
mock.onDelete("/api/payment/1").reply(200, {
  message: "성공적으로 삭제되었습니다.",
});
mock.onPut("/api/payment/1").reply(200, {
  message: "성공적으로 수정되었습니다.",
});
export default mock;
