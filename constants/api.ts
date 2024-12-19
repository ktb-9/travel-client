export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const REDIRECT_URI: any = process.env.EXPO_PUBLIC_REDIRECT_URI;
export const WEB = process.env.EXPO_PUBLIC_WEB || "http://localhost:3000";
export const AXIOS_BASE_URL =
  process.env.EXPO_PUBLIC_AXIOS_BASE_URL || "http://localhost:8000";
export const MAP_KEY = process.env.EXPO_PUBLIC_MAP_KEY;
export const END_POINTS = {
  LOGIN: "/auth/oauth/kakao/callback",
  REFRESH: "/auth/refresh",
  GETUPCOMMING: "/trip/upcomming",
  HISTORY: "history",
  SCHEDULE: "trip",
  ADDGROUP: "/group",
  UPDATEBACKGROUND_URL: (groupId: number) =>
    `group/background/upload/${groupId}`,
  GETPREVIOUSGROUP: "/previous",
  GETGROUP: (groupId: number) => `group/${groupId}`,
  UPDATEGROUP: (tripId: number) => `group/${tripId}`,
  GETMEMBER: (groupId: number) => `group/${groupId}/members`,
  UPDATEGROUPTHUMBNAIL: (groupId: number) => `group/upload/${groupId}`,
  POSTLINK: (groupId: number) => `group/invite/${groupId}`,
  trip: (tripId: number) => `trip/${tripId}`,
  ADDLOCATION: "trip/location",
  UPDATENEWLOCATIONTHUMBNAIL: `trip/upload/`,
  UPDATELOCATIONTHUMBNAIL: (locationId: number) => `trip/upload/${locationId}`,
  MYTRIP: "trip/mytrip",
  GETPAYMENTMEMBER: (tripId: number) => `payment/members/${tripId}`,
  POSTPAYMENT: "payment",
  PAYMENT: (tripId: number) => `payment/${tripId}`,
  DELETEPAYMENT: (paymentId: number) => `payment/${paymentId}`,
  GETANALYSIS: (tripId: number) => `analysis/${tripId}`,
} as const;

export const NETWORK = {
  RETRY_COUNT: 2,
  TIMEOUT: 10000,
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTP_ERROR_MESSAGE = {
  [HTTP_STATUS_CODE.NOT_FOUND]: {
    HEADING: "길을 잃었나요?",
    BODY: "요청하신 페이지를 찾을 수 없습니다.",
    BUTTON: "홈으로 가기",
  },
  [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: {
    HEADING: "현재 페이지를 표시할 수 없습니다.",
    BODY: `잠시 후 다시 시도해주세요.`,
    BUTTON: "새로고침",
  },
  [HTTP_STATUS_CODE.BAD_REQUEST]: {
    HEADING: "잘못된 요청입니다.",
    BODY: "확인 후 다시 시도해주세요.",
    BUTTON: "홈으로 가기",
  },
} as const;

// 토스트용 에러 메시지
export const TOAST_MESSAGES = {
  409: "이미 존재하는 데이터입니다.",
  422: "입력 값을 확인해주세요.",
  403: "접근 권한이 없습니다.",
} as const;

export const ERROR_MESSAGE = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export const TOKEN_KEY = "TOKEN";
export const USER_INFO_KEY = "USER";
