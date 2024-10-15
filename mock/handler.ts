import { http, HttpResponse } from "msw";

export const handlers = [
  // Mocking "/api/example" 엔드포인트
  http.get("/api/example", () => {
    return HttpResponse.json({
      message: "This is a mocked response",
    });
  }),
  // 여기에 더 많은 mock 핸들러를 추가할 수 있습니다.
];
