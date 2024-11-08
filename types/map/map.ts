import { SetStateAction } from "react";

export interface SearchResult {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string;
  y: string;
  category_group_code: string;
}

export interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export interface SelectedPlace {
  name: string;
  address: string;
  coordinates: CurrentLocation;
  category: string;
}
export interface debounceProps {
  searchQuery: string;
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
  setSearchResults: React.Dispatch<SetStateAction<SearchResult[]>>;
}
export interface currentLocationProps {
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<CurrentLocation | null>
  >;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<CurrentLocation | null>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface locationSelectState {
  result: SearchResult;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<CurrentLocation | null>
  >;
  setMarkers: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setSearchResults: (results: SearchResult[]) => void;
  setSearchQuery: (query: string) => void;
}
export interface markerProps {
  result: SearchResult;
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface MarkerListProps {
  markers: SearchResult[];
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface TimePickerModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  selectedTime: Date;
  setSelectedTime: React.Dispatch<React.SetStateAction<Date>>;
  setShowTimePicker: React.Dispatch<React.SetStateAction<boolean>>;
  showTimePicker: boolean;
}
export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  isSearching: boolean;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<CurrentLocation | null>
  >;
  setMarkers: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}
