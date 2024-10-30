import { CurrentLocation, SearchResult, SelectedPlace } from "./map";

export interface MapState {
  location: {
    current: CurrentLocation | null;
    selected: CurrentLocation | null;
    loading: boolean;
  };
  search: {
    query: string;
    results: SearchResult[];
    isSearching: boolean;
    markers: SearchResult[];
  };
  modal: {
    showModal: boolean;
    showTimePicker: boolean;
    selectedTime: Date;
    selectedPlace: SelectedPlace | null;
  };
}

export type MapAction =
  | { type: "SET_CURRENT_LOCATION"; payload: CurrentLocation | null }
  | { type: "SET_SELECTED_LOCATION"; payload: CurrentLocation | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SEARCH_RESULTS"; payload: SearchResult[] }
  | { type: "SET_IS_SEARCHING"; payload: boolean }
  | { type: "SET_MARKERS"; payload: SearchResult[] }
  | { type: "SET_SHOW_MODAL"; payload: boolean }
  | { type: "SET_SHOW_TIME_PICKER"; payload: boolean }
  | { type: "SET_SELECTED_TIME"; payload: Date }
  | { type: "SET_SELECTED_PLACE"; payload: SelectedPlace | null };
