import { atom } from "recoil";

// 테마 상태에 대한 타입: 다크 모드가 활성화되어 있는지 여부를 boolean으로 관리
export const themeState = atom<boolean>({
  key: "themeState", // 고유한 key 값
  default: false,
});
