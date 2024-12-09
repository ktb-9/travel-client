import { LocationItem } from "@/types/viewTrip/viewTrip";

export const defaults = {
  bg: "https://assetkungya.s3.ap-northeast-2.amazonaws.com/image/IMG_5969.HEIC",
  gt: "https://assetkungya.s3.ap-northeast-2.amazonaws.com/image/logo.png",
} as const;
export const categoryMap: { [key: string]: string } = {
  MT1: "대형마트",
  CS2: "편의점",
  PS3: "어린이집, 유치원",
  SC4: "학교",
  AC5: "학원",
  PK6: "주차장",
  OL7: "주유소, 충전소",
  SW8: "지하철역",
  BK9: "은행",
  CT1: "문화시설",
  AG2: "중개업소",
  PO3: "공공기관",
  AT4: "관광지",
  AD5: "숙박",
  FD6: "식당",
  CE7: "카페",
  HP8: "병원",
  PM9: "약국",
};
export const CATEGORIES = ["카페", "식당", "술", "간식"];
export const CATEGORY_COLORS: { [key: string]: string } = {
  술: "#FF6B6B",
  간식: "#FFB323",
  카페: "#4ECDC4",
};
export const DEFAULT_COLOR = "#339AF0";
export const initialLocationState: LocationItem = {
  name: "",
  address: "",
  category: "",
  visit_time: "",
  hashtag: "",
  thumbnail: "",
};
