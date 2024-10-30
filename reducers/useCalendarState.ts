import { useReducer, useEffect, useCallback } from "react";
import moment, { Moment } from "moment";
import { CalendarAction, CalendarState } from "@/types/calendar/calendarState";
import { ConfirmedTrip, OverlappingDates } from "@/types/calendar/calendar";
import { Client } from "@stomp/stompjs";

const initialState: CalendarState = {
  currentMonth: moment(),
  selectedTrip: null,
  confirmedTrip: null,
  modal: {
    visible: false,
  },
  ws: {
    client: undefined,
    isEnterChat: false,
  },
};

function calendarReducer(
  state: CalendarState,
  action: CalendarAction
): CalendarState {
  switch (action.type) {
    case "SET_CURRENT_MONTH":
      return {
        ...state,
        currentMonth: action.payload,
      };
    case "SET_SELECTED_TRIP":
      return {
        ...state,
        selectedTrip: action.payload,
      };
    case "SET_CONFIRMED_TRIP":
      return {
        ...state,
        confirmedTrip: action.payload,
      };
    case "SET_MODAL_VISIBLE":
      return {
        ...state,
        modal: { ...state.modal, visible: action.payload },
      };
    case "SET_WS_CLIENT":
      return {
        ...state,
        ws: { ...state.ws, client: action.payload },
      };
    case "SET_IS_ENTER_CHAT":
      return {
        ...state,
        ws: { ...state.ws, isEnterChat: action.payload },
      };
    default:
      return state;
  }
}

export function useCalendarState() {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  const actions = {
    setCurrentMonth: ((value: Moment | ((prev: Moment) => Moment)) => {
      const newValue =
        typeof value === "function" ? value(state.currentMonth) : value;
      dispatch({ type: "SET_CURRENT_MONTH", payload: newValue });
    }) as React.Dispatch<React.SetStateAction<Moment>>,

    setSelectedTrip: ((
      value:
        | OverlappingDates
        | null
        | ((prev: OverlappingDates | null) => OverlappingDates | null)
    ) => {
      const newValue =
        typeof value === "function" ? value(state.selectedTrip) : value;
      dispatch({ type: "SET_SELECTED_TRIP", payload: newValue });
    }) as React.Dispatch<React.SetStateAction<OverlappingDates | null>>,

    setConfirmedTrip: ((
      value:
        | ConfirmedTrip
        | null
        | ((prev: ConfirmedTrip | null) => ConfirmedTrip | null)
    ) => {
      const newValue =
        typeof value === "function" ? value(state.confirmedTrip) : value;
      dispatch({ type: "SET_CONFIRMED_TRIP", payload: newValue });
    }) as React.Dispatch<React.SetStateAction<ConfirmedTrip | null>>,

    setModalVisible: ((value: boolean | ((prev: boolean) => boolean)) => {
      const newValue =
        typeof value === "function" ? value(state.modal.visible) : value;
      dispatch({ type: "SET_MODAL_VISIBLE", payload: newValue });
    }) as React.Dispatch<React.SetStateAction<boolean>>,

    setWsClient: ((
      value:
        | Client
        | undefined
        | ((prev: Client | undefined) => Client | undefined)
    ) => {
      const newValue =
        typeof value === "function" ? value(state.ws.client) : value;
      dispatch({ type: "SET_WS_CLIENT", payload: newValue });
    }) as React.Dispatch<React.SetStateAction<Client | undefined>>,

    setIsEnterChat: ((value: boolean | ((prev: boolean) => boolean)) => {
      const newValue =
        typeof value === "function" ? value(state.ws.isEnterChat) : value;
      dispatch({ type: "SET_IS_ENTER_CHAT", payload: newValue });
    }) as React.Dispatch<React.SetStateAction<boolean>>,
  };

  return { state, actions };
}
