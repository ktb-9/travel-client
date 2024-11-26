import { HotplaceState } from "@/types/home/main";
import jeju from "@/assets/images/jeju.gif";
import busan from "@/assets/images/busan.gif";
import yeosu from "@/assets/images/yeousu.png";
import seoul from "@/assets/images/seoul.png";

export const data: HotplaceState[] = [
  {
    id: 1,
    image: jeju,
    mainDescription: "설렘으로 가득한 노을",
    subDescription: "제주에서 추억 만들러 갈까요?",
  },
  {
    id: 2,
    image: busan,
    mainDescription: "스트레스 풀 땐 바다지",
    subDescription: "부산함 갈까!",
  },
  {
    id: 3,
    image: yeosu,
    mainDescription: "공중에서 감성을",
    subDescription: "여수 케이블카 타고 감성 느끼로 ㄱ?",
  },
  {
    id: 4,
    image: seoul,
    mainDescription: "예쁜 야경을 한 눈에",
    subDescription: "서울을 모든걸 담으러 갈래?",
  },
];
