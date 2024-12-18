import { DebouncedFunc } from "lodash";
import { SetStateAction } from "react";
import { AddLocationState, LocationItem } from "../viewTrip/viewTrip";
import MapView from "react-native-maps";

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
  setMapMarkers?: React.Dispatch<React.SetStateAction<SearchResult[]>>;
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
export interface EditSearchProps {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      location_id: number;
      name: string;
      address: string;
      visit_time: string;
      category: string;
      hashtag: string;
      thumbnail: string;
    }>
  >;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  useDebouncedSearch: DebouncedFunc<
    ({
      searchQuery,
      setIsSearching,
      setSearchResults,
    }: debounceProps) => Promise<void>
  >;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface FormGroupProps {
  formData: {
    location_id: number;
    name: string;
    address: string;
    visit_time: string;
    category: string;
    hashtag: string;
    thumbnail: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      location_id: number;
      name: string;
      address: string;
      visit_time: string;
      category: string;
      hashtag: string;
      thumbnail: string;
    }>
  >;
  handleSearch: (text: string) => void;
  showSearchResults: boolean;
  isSearching: boolean;
  searchResults: SearchResult[];
  handleSelectPlace: (place: SearchResult) => void;
}
export interface LocationSearchProps {
  currentLocationIndex: number;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  useDebouncedSearch: DebouncedFunc<
    ({
      searchQuery,
      setIsSearching,
      setSearchResults,
    }: debounceProps) => Promise<void>
  >;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setNewLocation: React.Dispatch<React.SetStateAction<AddLocationState>>;
  setCurrentLocationIndex: React.Dispatch<React.SetStateAction<number>>;
  newLocation: AddLocationState;
}
export interface MapLocationSearchProps {
  isMapSelectionMode: true;
  toggleMapSelectionMode: () => void;
  setIsMapSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;
  updateLocationField: (
    index: number,
    field: keyof LocationItem,
    value: string
  ) => void;
  currentLocationIndex: number;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface MapStateProps {
  mapMarkers: SearchResult[];
  mapViewRef: React.RefObject<MapView>;
  updateLocationField: (
    index: number,
    field: keyof LocationItem,
    value: string
  ) => void;
  currentLocationIndex: number;
  setIsMapSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMapSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setMapSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setMapMarkers: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}
export interface AddLocationInputGroupState {
  currentLocation: LocationItem;
  updateLocationField: (
    index: number,
    field: keyof LocationItem,
    value: string
  ) => void;
  currentLocationIndex: number;
  handleSearch: (text: string) => void;
  showSearchResults: boolean;
  isSearching: boolean;
  searchResults: SearchResult[];
  handleSelectPlace: (place: SearchResult) => void;
  toggleMapSelectionMode: () => void;
  newLocation: AddLocationState;
  removeLocation: (index: number) => void;
}
export interface LocationTabsProps {
  newLocation: AddLocationState;
  currentLocationIndex: number;
  setCurrentLocationIndex: React.Dispatch<React.SetStateAction<number>>;
  addNewLocation: () => void;
}
