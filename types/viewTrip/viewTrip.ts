import { SearchResult } from "../map/map";

export interface groupState {
  groupThumbnail?: any;
  groupName?: string;
  date: string;
}
export interface Location {
  name: string;
  address: string;
  visitTime: string;
  thumbnail: string;
  category: string;
  hashtag: string;
}

export interface planState {
  day: number;
  destination: string;
  locations: Location[];
}

export interface tripState {
  date?: string;
  groupThumbnail: any; // Remove `?`
  groupName: string; // Remove `?`
  days?: planState[];
}
export interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  location: Location;
  day: number;
}
export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  children?: React.ReactNode;
}
export interface ModalHeaderProps {
  onClose: () => void;
  onSave: () => void;
  title: string;
}
export interface SearchResultsProps {
  show: boolean;
  isSearching: boolean;
  results: SearchResult[];
  onSelect: (place: SearchResult) => void;
}
