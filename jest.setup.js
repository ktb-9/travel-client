// jest.setup.js
import { server } from "./mock/handler";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
