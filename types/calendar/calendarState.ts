import { Moment } from "moment";
import { Client } from "@stomp/stompjs";
import { ConfirmedTrip, OverlappingDates } from "@/types/calendar/calendar";

export interface CalendarState {
  currentMonth: Moment;
  selectedTrip: OverlappingDates | null;
  confirmedTrip: ConfirmedTrip | null;
  modal: {
    visible: boolean;
  };
  ws: {
    client: Client | undefined;
    isEnterChat: boolean;
  };
}

export type CalendarAction =
  | { type: "SET_CURRENT_MONTH"; payload: Moment }
  | { type: "SET_SELECTED_TRIP"; payload: OverlappingDates | null }
  | { type: "SET_CONFIRMED_TRIP"; payload: ConfirmedTrip | null }
  | { type: "SET_MODAL_VISIBLE"; payload: boolean }
  | { type: "SET_WS_CLIENT"; payload: Client | undefined }
  | { type: "SET_IS_ENTER_CHAT"; payload: boolean };
