export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const REDIRECT_URI: any = process.env.EXPO_PUBLIC_REDIRECT_URI;

export const AXIOS_BASE_URL = process.env.EXPO_PUBLIC_AXIOS_BASE_URL;
export const MAP_KEY = process.env.EXPO_PUBLIC_MAP_KEY;
export const END_POINTS = {
  LOGIN: "/auth/oauth/kakao/callback",
  SCHEDULE: "trip",
  ADDGROUP: "/group",
  GETGROUP: (groupId: number) => `group/${groupId}`,
  GETMEMBER: (groupId: number) => `group/${groupId}/members`,
  POSTLINK: (groupId: number) => `group/invite/${groupId}`,
  trip: (tripId: number) => `trip/${tripId}`,
  ADDLOCATION: "trip/location",
  MYTRIP: "trip/mytrip",
  postPayment: "/api/payment",
  payment: (groupId: number) => `/api/payment/${groupId}`,
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

export const ERROR_CODE = {
  DUPLICATED_NICKNAME: 1013,
  LARGE_IMAGE_FILE: 5001,
  TOKEN_ERROR_RANGE: 9000,
  INVALID_REFRESH_TOKEN: 9101,
  INVALID_ACCESS_TOKEN: 9102,
  EXPIRED_REFRESH_TOKEN: 9103,
  EXPIRED_ACCESS_TOKEN: 9104,
  INVALID_TOKEN_VALIDATE: 9105,
  NULL_REFRESH_TOKEN: 9106,
  UNAUTHORIZED: 9201,
  UNEXPECTED_TOKEN_ERROR: 9999,
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

export const ERROR_MESSAGE = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export const TOKEN_KEY = "TOKEN";
export const USER_INFO_KEY = "USER";
