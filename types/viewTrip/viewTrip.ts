import { SearchResult } from "../map/map";

export interface groupState {
  groupId: number;
  groupThumbnail?: any;
  groupName?: string;
  date: string;
}
export interface Location {
  locationId: number;
  name: string;
  address: string;
  visit_time: string;
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
  setLocationValue: React.Dispatch<React.SetStateAction<Location>>;
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
export interface AddLocationModalProps {
  visible: boolean;
  onClose: () => void;
  day: number;
  setLocationValue: React.Dispatch<React.SetStateAction<Location>>;
}
export interface LocationItem {
  locationId: number;
  name: string;
  address: string;
  category: string;
  visitTime: string;
  hashtag: string;
  thumbnail: string;
}
export interface AddLocationState {
  groupId: number;
  day: number;
  destination: string;
  locations: LocationItem[];
}
export interface FooterProps {
  onCancel: () => void;
  onSubmit: () => void;
}
export interface addFormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  required?: boolean;
  editable?: boolean;
}
export interface ImagePickerSectionProps {
  thumbnail: string;
  onImageSelect: (uri: string) => void;
}
export interface addSearchResultsProps {
  isSearching: boolean;
  searchResults: SearchResult[];
  onSelectPlace: (place: SearchResult) => void;
}
