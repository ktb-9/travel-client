import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_INFO_STATE_KEY } from "@/constants/api";

// AsyncStorage에서 상태 불러오기
const getUserInfoFromAsyncStorage = async () => {
  try {
    const storedUserInfo = await AsyncStorage.getItem(USER_INFO_STATE_KEY);
    return storedUserInfo
      ? JSON.parse(storedUserInfo)
      : { userId: "", nickname: "", profileImage: "" };
  } catch (error) {
    console.error("Failed to load user info from AsyncStorage", error);
    return { userId: "", nickname: "", profileImage: "" };
  }
};

// AsyncStorage에 상태 저장하기
const saveUserInfoToAsyncStorage = async (userInfo: any) => {
  try {
    await AsyncStorage.setItem(USER_INFO_STATE_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error("Failed to save user info to AsyncStorage", error);
  }
};

// Recoil atom 정의
export const userInfoState_unique = atom({
  key: USER_INFO_STATE_KEY, // 상수 사용
  default: getUserInfoFromAsyncStorage(), // 초기값을 AsyncStorage에서 불러옴
});

// Selector를 통해 상태가 업데이트될 때 AsyncStorage에 저장
export const userInfoStateWithStorage = selector({
  key: "userInfoStateWithStorage",
  get: async ({ get }) => {
    const userInfo = get(userInfoState_unique);
    return userInfo;
  },
  set: async ({ set }, newValue) => {
    await saveUserInfoToAsyncStorage(newValue); // 상태를 AsyncStorage에 저장
    set(userInfoState_unique, newValue); // Recoil 상태 업데이트
  },
});
