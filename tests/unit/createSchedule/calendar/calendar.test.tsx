// Calendar.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { RecoilRoot } from "recoil";
import Calendar from "@/components/createSchedule/calendar/calendar"; // Calendar 컴포넌트 경로를 조정하세요
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import { useCalendarState } from "@/reducers/useCalendarState";
import moment from "moment";

// useCalendarState를 Mocking합니다.
jest.mock("@/reducers/useCalendarState");

describe("Calendar Component", () => {
  const mockSetSchedule = jest.fn();
  const mockSetWsClient = jest.fn();
  const mockSetIsEnterChat = jest.fn();

  beforeEach(() => {
    // useCalendarState의 반환 값을 설정합니다.
    (useCalendarState as jest.Mock).mockReturnValue({
      state: {
        currentMonth: moment(), // 현재 월을 사용합니다.
        confirmedTrip: null,
        modal: { visible: false },
      },
      actions: {
        setCurrentMonth: jest.fn(),
        setWsClient: mockSetWsClient,
        setIsEnterChat: mockSetIsEnterChat,
        setModalVisible: jest.fn(),
        setConfirmedTrip: jest.fn(),
        setSelectedTrip: jest.fn(),
      },
    });
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <RecoilRoot>
        <Calendar groupName="Test Group" />
      </RecoilRoot>
    );

    // 컴포넌트의 제목이 올바르게 렌더링되는지 확인합니다.
    expect(getByText("공동 일정 등록")).toBeTruthy();
  });

  it("handles month navigation", () => {
    const { getByTestId } = render(
      <RecoilRoot>
        <Calendar groupName="Test Group" />
      </RecoilRoot>
    );

    const arrowButton = getByTestId("arrow-button"); // 화살표 버튼에 testID 설정 필요
    fireEvent.press(arrowButton);

    // 현재 월이 변경되었는지 확인합니다.
    expect(useCalendarState().actions.setCurrentMonth).toHaveBeenCalled();
  });

  it("displays overlapping dates correctly", () => {
    const { getByText } = render(
      <RecoilRoot>
        <Calendar groupName="Test Group" />
      </RecoilRoot>
    );

    // 겹치는 날짜가 제대로 렌더링되는지 확인합니다.
    expect(getByText("모두가 가능한 날짜")).toBeTruthy();
  });

  it("opens the modal when trip options are selected", () => {
    const { getByText, getByTestId } = render(
      <RecoilRoot>
        <Calendar groupName="Test Group" />
      </RecoilRoot>
    );

    // 일정 확인 버튼 클릭
    fireEvent.press(getByText("일정확정"));

    // 모달이 열리는지 확인합니다.
    expect(getByText("여행 기간 선택")).toBeTruthy();
  });

  afterEach(() => {
    jest.clearAllMocks(); // 모든 모의 함수 호출 카운트를 초기화합니다.
  });
});
