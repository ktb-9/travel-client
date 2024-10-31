import React from "react";
import { render } from "@testing-library/react-native";
import CreateSchedule from "@/app/Schedule/createSchedule"; // Adjust the import path as necessary

// Mock Header and Content components
jest.mock("@/components/createSchedule/header/header", () => {
  const { Text } = require("react-native");
  return () => <Text testID="header">Header Component</Text>;
});

jest.mock("@/components/createSchedule/content/content", () => {
  const { Text } = require("react-native");
  return () => <Text testID="content">Content Component</Text>;
});

describe("CreateSchedule Component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<CreateSchedule />);

    // Check if Header and Content components are rendered
    expect(getByTestId("header")).toBeTruthy();
    expect(getByTestId("content")).toBeTruthy();
  });

  it("renders SafeAreaView as the outermost component", () => {
    const { getByTestId } = render(<CreateSchedule />);

    const safeAreaView = getByTestId("safe-area-view");
    expect(safeAreaView).toBeTruthy();
  });
});
