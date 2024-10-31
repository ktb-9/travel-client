import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native/extend-expect";

// Mock the Recoil
jest.mock("recoil", () => ({
  atom: jest.fn(),
  useRecoilState: jest.fn(),
  // Add other Recoil hooks you're using
}));

// Mock the Expo Router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    // Add other router methods you're using
  }),
}));

// Mock moment
jest.mock("moment", () => {
  const moment = jest.requireActual("moment");
  return moment;
});

// Mock the WebSocket
global.WebSocket = jest.fn(() => ({
  send: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Setup for handling async storage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock the SafeAreaContext
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));
