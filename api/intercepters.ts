import * as Sentry from "@sentry/react-native";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosinstance";
import { HTTP_STATUS_CODE, TOAST_MESSAGES, TOKEN_KEY } from "../constants/api";
import postNewToken from "./user/postNewToken";
import { HTTPError } from "./HTTPError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationService } from "@/service/NavigationService";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

// 에러 응답 타입
export interface ErrorResponse {
  statusCode?: number;
  message?: string;
  code?: number;
}

// 토큰 체크 및 토큰 저장
export const checkAndSetToken = async (config: InternalAxiosRequestConfig) => {
  // 토큰이 필요하지 않은 요청은 Authorization을 설정하지 않음
  if (config.headers?.["Skip-Auth"]) return config;

  // 이미 Authorization이 설정된 경우 설정하지 않음
  if (config.headers?.Authorization) return config;

  // AsyncStorage에서 토큰 가져오기
  const tokensString = await AsyncStorage.getItem(TOKEN_KEY);

  if (!tokensString) {
    router.replace("/(tabs)");
    throw new Error("토큰이 유효하지 않습니다.");
  }

  // JSON 파싱하여 accessToken 추출
  let tokens;
  try {
    tokens = JSON.parse(tokensString);
  } catch (error) {
    console.error("Failed to parse tokens:", error);
    router.replace("/(tabs)");
    throw new Error("유효하지 않은 토큰 형식입니다.");
  }

  const accessToken = tokens?.accessToken;

  if (!accessToken) {
    router.replace("/(tabs)");
    throw new Error("토큰이 유효하지 않습니다.");
  }

  // Authorization 헤더 설정
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// 토큰 오류 처리 및 재요청 함수
export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  const originalRequest = error.config;

  // 응답이나 originalRequest가 없으면 에러 처리
  if (!error.response || !originalRequest)
    throw new Error("에러 발생했습니다.");

  const { data, status } = error.response;
  // Sentry에 에러 정보를 기록
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", error.response?.data); // 에러 응답 정보 추가
    scope.setExtra("currentScreen", NavigationService.getCurrentRoute());
    Sentry.captureMessage(`[APIError] ${JSON.stringify(error.response?.data)}`);
  });

  // 401 Unauthorized 에러일 경우
  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    try {
      // 새로운 토큰을 발급받기 위해 postNewToken을 호출
      const { accessToken } = await postNewToken();

      // 발급받은 토큰을 Authorization 헤더에 추가
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // 원래 요청을 재시도
      return axiosInstance(originalRequest);
    } catch (err) {
      // 토큰 갱신 실패 시, 로컬 스토리지에서 토큰을 삭제하고 에러 처리
      AsyncStorage.removeItem(TOKEN_KEY);
      throw new HTTPError(status, data.message, data.code);
    }
  }

  // 401 외의 다른 오류가 발생한 경우는 그대로 에러를 throw
  throw error;
};
// API 에러 처리 함수
export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", error.response?.data); // 에러 응답 정보 추가
    scope.setExtra("currentScreen", NavigationService.getCurrentRoute());
    Sentry.captureMessage(`[APIError] ${JSON.stringify(error.response?.data)}`);
  });

  if (!error.response) throw error;

  const { data, status } = error.response;

  // 주요 에러는 에러 페이지로 (404, 500)
  // HTTP_STATUS_CODE 값을 직접 사용
  if (
    status === HTTP_STATUS_CODE.NOT_FOUND ||
    status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
  ) {
    throw new HTTPError(status, data.message, data.code);
  }

  // 토스트로 보여줄 에러 메시지
  if (status in TOAST_MESSAGES) {
    Toast.show({
      type: "error",
      text1: "오류",
      text2: TOAST_MESSAGES[status as keyof typeof TOAST_MESSAGES],
      position: "bottom",
      visibilityTime: 4000,
    });
    return Promise.reject(error);
  }

  // 그 외 일반 에러는 서버에서 온 메시지 사용
  Toast.show({
    type: "error",
    text1: "오류",
    text2: data.message || "알 수 없는 에러가 발생했습니다.",
    position: "bottom",
    visibilityTime: 4000,
  });

  return Promise.reject(error);
};
