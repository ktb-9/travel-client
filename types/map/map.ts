export interface SearchResult {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string;
  y: string;
}

export interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export interface SelectedPlace {
  name: string;
  address: string;
  coordinates: CurrentLocation;
}
