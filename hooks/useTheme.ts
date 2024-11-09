import { themeState } from "@/recoil/themeState";
import { useRecoilState } from "recoil";

// 리턴 값의 타입을 명시한 커스텀 훅
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(themeState);

  // 다크 모드 토글 함수
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  return { isDarkMode, toggleTheme };
};
