export const BASE_URL =
  "http://healthkungya.s3-website.ap-northeast-2.amazonaws.com";
export const REDIRECT_URI = `${BASE_URL}/oauth/kakao/callback`;

export const AXIOS_BASE_URL = "http://localhost:8000";
export const MAP_KEY = "38789b5f2f2e16d6229dbc25dc0c776b";
export const SERVER_URL = "http://localhost:8080/ws";
export const SUB_ENDPOINT = "/topic/calendar";
export const PUB_ENDPOINT = "/app/calendar";
export const END_POINTS = {
  LOGIN: "/auth/oauth/kakao/callback",
  SCHEDULE: "/api/schedule",
  ADDGROUP: "/group",
  GETGROUP: (groupId: number) => `group/${groupId}`,
  GETMEMBER: (groupId: number) => `group/${groupId}/members`,
  POSTLINK: (groupId: number) => `group/invite/${groupId}`,
  trip: (groupId: number) => `/api/trip/${groupId}`,
  postTrip: "/api/trip",
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

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";

export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
export const USER_INFO_STATE_KEY = "userInfoState_unique";
