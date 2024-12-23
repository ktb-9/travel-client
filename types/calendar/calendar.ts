import { Client } from "@stomp/stompjs";
import moment from "moment";

export interface DateRange {
  start: string | null;
  end: string | null;
}

export interface renderDateRange {
  start: moment.Moment | null;
  end: moment.Moment | null;
}

export interface CalendarMessage {
  type: "SELECT_DATE" | "CLEAR_DATE";
  dateRange: DateRange;
  userId: string;
  nickname?: string | null; // optional nickname
}

export interface UserDateRanges {
  [key: string]: DateRange & {
    userId: string;
    nickname: string | null;
  };
}

export interface StompHandlerProps {
  setIsEnterChat: React.Dispatch<React.SetStateAction<boolean>>;
  setUserDateRanges: React.Dispatch<React.SetStateAction<UserDateRanges>>;
  setWsClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
  userId: string;
}

export interface OverlappingDates {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}

export interface ConfirmedTrip {
  startDate: string;
  endDate: string;
  nights: number;
}

export interface StompHandlerRef {
  sendCalendarUpdate: (range: renderDateRange) => void;
}

export interface UserDateRange {
  start: string | null;
  end: string | null;
  userId: string;
  nickname: string | null;
}

export interface RenderHeaderProps {
  onPressArrow: (direction: number) => void;
  currentMonth: moment.Moment;
}

export interface overlapDateRange {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}

export interface UseFindOverlappingDatesProps {
  userDateRanges: UserDateRanges;
  setOverlappingDates: (dates: OverlappingDates[]) => void;
}

interface SelectedTrip {
  startDate: string;
  numberOfDays: number;
}

export interface RenderTripOptionsProps {
  setModalVisible: (visible: boolean) => void;
  setConfirmedTrip: (trip: {
    startDate: string;
    endDate: string;
    nights: number;
  }) => void;
  selectedTrip: SelectedTrip | null;
}
