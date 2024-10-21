// mock/axios-mock.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// API 응답 타입 정의
interface ExampleResponse {
  message: string;
}

// Create a new instance of axios-mock-adapter
const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

// Mock API endpoints
mock.onGet("/api/example").reply<ExampleResponse>(200, {
  message: "This is a mocked response",
});

export default mock;
