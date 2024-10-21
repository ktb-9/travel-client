// mock/axios-mock.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import daegu from "@/assets/images/daegu.png";
import jeans from "@/assets/images/jeans.png";

// API 응답 타입 정의
interface ExampleResponse {
  message: string;
}
interface upCommingResponse {
  data: {
    destination: string;
    thumbnail: any;
    day: string;
    nickname: string;
    groupThumbnail: any;
  };
}
const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

mock.onGet("/api/example").reply<ExampleResponse>(200, {
  message: "This is a test",
});

mock.onGet("/api/upcomming").reply<upCommingResponse>(200, {
  data: {
    destination: "대구",
    thumbnail: daegu,
    day: "D-19",
    nickname: "청바지",
    groupThumbnail: jeans,
  },
});

export default mock;
