import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_INFO_KEY } from "@/constants/api";

interface AuthType {
  id: number;
  nickname: string;
  profileImage: string;
}

// Selector를 사용하여 초기값을 설정
const authState = atom<AuthType>({
  key: "authState",
  default: selector({
    key: "authState/default",
    get: async () => {
      try {
        const user = await AsyncStorage.getItem(USER_INFO_KEY);
        if (user) {
          return JSON.parse(user) as AuthType;
        }
      } catch (error) {
        console.error("Failed to load user info from AsyncStorage:", error);
      }
      // 키가 없거나 에러가 발생했을 때 기본값 반환
      return { id: 0, nickname: "", profileImage: "" };
    },
  }),
});

export default authState;
