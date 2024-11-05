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
