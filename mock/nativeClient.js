import { http, HttpResponse } from "msw";
import { handlers } from "./handler";

// 핸들러에서 특정 URL과 method를 찾는 함수
const findHandler = (method, url) => {
  return handlers.find(
    (handler) =>
      handler.info.method.toLowerCase() === method.toLowerCase() &&
      handler.info.path === url
  );
};

// Native fetch mocking 함수
export const nativeFetch = async (url, init) => {
  const method = init?.method || "GET";
  const handler = findHandler(method, url.toString());

  if (handler) {
    const response = await handler.run({
      request: new Request(url, init),
      params: {},
      cookies: {},
    });

    if (response instanceof HttpResponse) {
      const { status, headers, body } = response;
      return new Response(body, { status, headers });
    }
  }

  return fetch(url, init); // 핸들러를 찾지 못한 경우 실제 fetch 호출
};
