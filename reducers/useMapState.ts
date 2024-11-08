import { CurrentLocation, SearchResult, SelectedPlace } from "@/types/map/map";
import { MapAction, MapState } from "@/types/map/mapState";
import { useReducer } from "react";
import { SetStateAction } from "react";
const initialState: MapState = {
  location: {
    current: null,
    selected: null,
    loading: true,
  },
  search: {
    query: "",
    results: [],
    isSearching: false,
    markers: [],
  },
  modal: {
    showModal: false,
    showTimePicker: false,
    selectedTime: new Date(),
    selectedPlace: null,
  },
};

function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        location: { ...state.location, current: action.payload },
      };
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        location: { ...state.location, selected: action.payload },
      };
    case "SET_LOADING":
      return {
        ...state,
        location: { ...state.location, loading: action.payload },
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        search: { ...state.search, query: action.payload },
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        search: { ...state.search, results: action.payload },
      };
    case "SET_IS_SEARCHING":
      return {
        ...state,
        search: { ...state.search, isSearching: action.payload },
      };
    case "SET_MARKERS":
      return {
        ...state,
        search: { ...state.search, markers: action.payload },
      };
    case "SET_SHOW_MODAL":
      return {
        ...state,
        modal: { ...state.modal, showModal: action.payload },
      };
    case "SET_SHOW_TIME_PICKER":
      return {
        ...state,
        modal: { ...state.modal, showTimePicker: action.payload },
      };
    case "SET_SELECTED_TIME":
      return {
        ...state,
        modal: { ...state.modal, selectedTime: action.payload },
      };
    case "SET_SELECTED_PLACE":
      return {
        ...state,
        modal: { ...state.modal, selectedPlace: action.payload },
      };
    default:
      return state;
  }
}

export function useMapState() {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const locationActions = {
    setCurrentLocation: (
      location: CurrentLocation | null | SetStateAction<CurrentLocation | null>
    ) =>
      dispatch({
        type: "SET_CURRENT_LOCATION",
        payload:
          typeof location === "function"
            ? location(state.location.current)
            : location,
      }),
    setSelectedLocation: (
      location: CurrentLocation | null | SetStateAction<CurrentLocation | null>
    ) =>
      dispatch({
        type: "SET_SELECTED_LOCATION",
        payload:
          typeof location === "function"
            ? location(state.location.selected)
            : location,
      }),
    setLoading: (loading: SetStateAction<boolean>) =>
      dispatch({
        type: "SET_LOADING",
        payload:
          typeof loading === "function"
            ? loading(state.location.loading)
            : loading,
      }),
  };

  const searchActions = {
    setSearchQuery: (query: SetStateAction<string>) =>
      dispatch({
        type: "SET_SEARCH_QUERY",
        payload:
          typeof query === "function" ? query(state.search.query) : query,
      }),
    setSearchResults: (results: SetStateAction<SearchResult[]>) =>
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload:
          typeof results === "function"
            ? results(state.search.results)
            : results,
      }),
    setIsSearching: (isSearching: SetStateAction<boolean>) =>
      dispatch({
        type: "SET_IS_SEARCHING",
        payload:
          typeof isSearching === "function"
            ? isSearching(state.search.isSearching)
            : isSearching,
      }),
    setMarkers: (markers: SetStateAction<SearchResult[]>) =>
      dispatch({
        type: "SET_MARKERS",
        payload:
          typeof markers === "function"
            ? markers(state.search.markers)
            : markers,
      }),
  };
  const modalActions = {
    setShowModal: (show: SetStateAction<boolean>) =>
      dispatch({
        type: "SET_SHOW_MODAL",
        payload:
          typeof show === "function" ? show(state.modal.showModal) : show,
      }),
    setShowTimePicker: (show: SetStateAction<boolean>) =>
      dispatch({
        type: "SET_SHOW_TIME_PICKER",
        payload:
          typeof show === "function" ? show(state.modal.showTimePicker) : show,
      }),
    setSelectedTime: (time: SetStateAction<Date>) =>
      dispatch({
        type: "SET_SELECTED_TIME",
        payload:
          typeof time === "function" ? time(state.modal.selectedTime) : time,
      }),
    setSelectedPlace: (place: SetStateAction<SelectedPlace | null>) =>
      dispatch({
        type: "SET_SELECTED_PLACE",
        payload:
          typeof place === "function"
            ? place(state.modal.selectedPlace)
            : place,
      }),
  };

  return {
    state,
    actions: {
      ...locationActions,
      ...searchActions,
      ...modalActions,
    },
  };
}
