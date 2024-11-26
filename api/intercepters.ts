import * as Sentry from "@sentry/react";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosinstance";
import { ERROR_CODE, HTTP_STATUS_CODE, TOKEN_KEY } from "../constants/api";
import postNewToken from "./user/postNewToken";
import { HTTPError } from "./HTTPError";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    window.location.href = "/";
    throw new Error("토큰이 유효하지 않습니다.");
  }

  // JSON 파싱하여 accessToken 추출
  let tokens;
  try {
    tokens = JSON.parse(tokensString);
  } catch (error) {
    console.error("Failed to parse tokens:", error);
    window.location.href = "/";
    throw new Error("유효하지 않은 토큰 형식입니다.");
  }

  const accessToken = tokens?.accessToken;

  if (!accessToken) {
    window.location.href = "/";
    throw new Error("토큰이 유효하지 않습니다.");
  }

  // Authorization 헤더 설정
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    Sentry.captureMessage(
      `[TokenError] ${window.location.href} \n ${error.response?.data}`
    );
  });
  const originalRequest = error.config;
  if (!error.response || !originalRequest)
    throw new Error("에러 발생했습니다.");
  const { data, status } = error.response;
  if (
    status == HTTP_STATUS_CODE.BAD_REQUEST &&
    data.code === ERROR_CODE.EXPIRED_ACCESS_TOKEN
  ) {
    const { accessToken } = await postNewToken();
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return axiosInstance(originalRequest);
  }
  if (
    status === HTTP_STATUS_CODE.BAD_REQUEST &&
    (data.code === ERROR_CODE.INVALID_ACCESS_TOKEN ||
      data.code === ERROR_CODE.INVALID_REFRESH_TOKEN ||
      data.code === ERROR_CODE.EXPIRED_REFRESH_TOKEN ||
      data.code === ERROR_CODE.INVALID_TOKEN_VALIDATE ||
      data.code === ERROR_CODE.NULL_REFRESH_TOKEN ||
      data.code === ERROR_CODE.UNEXPECTED_TOKEN_ERROR ||
      data.code === ERROR_CODE.UNAUTHORIZED ||
      data.code === ERROR_CODE.INVALID_ACCESS_TOKEN)
  ) {
    await AsyncStorage.removeItem("userTokens");
    throw new HTTPError(status, data.message, data.code);
  }
  throw error;
};
export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    Sentry.captureMessage(
      `[APIError] ${window.location.href} \n ${error.response?.data}`
    );
  });
  if (!error.response) throw error;
  const { data, status } = error.response;
  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }
  throw new HTTPError(status, data.message, data.code);
};
