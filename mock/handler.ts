// mock/axios-mock.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import daegu from "@/assets/images/daegu.png";
import jeans from "@/assets/images/jeans.png";
import sokcho from "@/assets/images/sokcho.png";
import chuncheon from "@/assets/images/chuncheon.png";
import shin from "@/assets/images/shin.png";
import chul from "@/assets/images/chul.png";
import mang from "@/assets/images/mang.png";
import hoon from "@/assets/images/hoon.png";
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

type HotplaceData = {
  id: string;
  destination: any;
  mainDescription: string;
  subDescription: string;
  hashTag: string;
};

type DataState = {
  data: HotplaceData[];
};

interface inviteData {
  id: number;
  name: string;
  lead: boolean;
  image: any;
}
interface inviteDataState {
  data: inviteData[];
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
mock.onGet("/api/hotplace").reply<DataState>(200, {
  data: [
    {
      id: "1",
      destination: sokcho,
      mainDescription: "속초 여행",
      subDescription: "2024-06-18~2024-06-19",
      hashTag: "#속초 해산물 #속초 포켓몬빵 #속초 헤엄",
    },
    {
      id: "2",
      destination: chuncheon,
      mainDescription: "춘천 여행",
      subDescription: "2024-08-14~2024-06-19",
      hashTag: "#200일 #애인 #달갈비 #자전거",
    },
    {
      id: "3",
      destination: chuncheon,
      mainDescription: "춘천 여행",
      subDescription: "2024-08-14~2024-06-19",
      hashTag: "#200일 #애인 #달갈비 #자전거",
    },
    {
      id: "3",
      destination: chuncheon,
      mainDescription: "춘천 여행",
      subDescription: "2024-08-14~2024-06-19",
      hashTag: "#200일 #애인 #달갈비 #자전거",
    },
    {
      id: "3",
      destination: chuncheon,
      mainDescription: "춘천 여행",
      subDescription: "2024-08-14~2024-06-19",
      hashTag: "#200일 #애인 #달갈비 #자전거",
    },
  ],
});
mock.onGet("/api/invite").reply<inviteDataState>(200, {
  data: [
    {
      id: 1,
      name: "신짱구",
      lead: true,
      image: shin,
    },
    {
      id: 2,
      name: "김철수",
      lead: false,
      image: chul,
    },
    {
      id: 3,
      name: "맹구",
      lead: false,
      image: mang,
    },
    {
      id: 4,
      name: "훈이",
      lead: false,
      image: hoon,
    },
  ],
});
export default mock;
