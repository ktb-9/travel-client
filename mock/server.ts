import { setupServer } from "msw/node";
import { handlers } from "./handler";

export const server = setupServer(...handlers);

// 개발 환경에서 서버를 시작
if (__DEV__) {
  server.listen();
}
