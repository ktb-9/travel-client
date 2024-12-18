import axios from "axios";
import {
  checkAndSetToken,
  handleAPIError,
  handleTokenError,
} from "./intercepters";
import { AXIOS_BASE_URL, NETWORK } from "../constants/api";

export const axiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
  timeout: NETWORK.TIMEOUT,
});

// Request 인터셉터 - 토큰 체크만 수행
axiosInstance.interceptors.request.use(checkAndSetToken, (error) =>
  Promise.reject(error)
);

// Response 인터셉터 - 토큰 에러 처리 후 API 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      // 401 에러일 경우 토큰 갱신 시도
      if (error.response?.status === 401) {
        return await handleTokenError(error);
      }
      // 그 외 에러는 handleAPIError로 처리
      await handleAPIError(error); // handleAPIError 실행을 기다림
      await new Promise((resolve) => setTimeout(resolve, 100)); // 토스트 표시를 위한 지연
      return Promise.reject(error); // 최종적으로 에러를 reject
    } catch (e) {
      return Promise.reject(e);
    }
  }
);
