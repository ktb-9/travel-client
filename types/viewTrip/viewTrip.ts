import { SearchResult } from "../map/map";

export interface groupState {
  group_id: number;
  groupThumbnail?: any;
  groupName?: string;
  date: string;
}
export interface Location {
  location_id: number;
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
  initialPlace?: SearchResult; // 추가
}
export interface LocationItem {
  name: string;
  address: string;
  category: string;
  visit_time: string;
  hashtag: string;
  thumbnail: string;
}
export interface AddLocationState {
  tripId: number;
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
  locationId: number;
  onImageSelect: (uri: string) => void;
}
export interface addSearchResultsProps {
  isSearching: boolean;
  searchResults: SearchResult[];
  onSelectPlace: (place: SearchResult) => void;
}
export interface LocationsProps {
  location: Location;
  day: number;
  setDays: React.Dispatch<React.SetStateAction<planState[]>>;
}
export interface TripPlanProps {
  data: tripState; // TripPlanProps의 data는 tripState 타입
}
export interface useTripPlanProps {
  days: planState[];
  setDays: React.Dispatch<React.SetStateAction<planState[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}
export interface DayHeaderProps {
  day: number;
  destination: string;
  locations: planState["locations"];
  setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface DayProps {
  day: number;
  destination: string;
  locations: planState["locations"];
  setDays: React.Dispatch<React.SetStateAction<planState[]>>;
}
export interface tripDeleteProps {
  location: Location;
  setDays: React.Dispatch<React.SetStateAction<planState[]>>;
  tripId: number;
}
export interface LocationCardProps {
  locationValue: Location;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  renderHashtags: () => React.JSX.Element | null;
  handleWebView: () => void;
}
export interface LocationValueProps {
  locationValue: Location;
}
