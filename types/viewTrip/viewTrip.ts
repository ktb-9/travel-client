export interface groupState {
  groupThumbnail: any;
  groupName: string;
  date: string;
}
export interface Location {
  name: string;
  address: string;
  visitTime: string;
  thumbnail: string;
  category: string;
  hastag: string;
}

export interface planState {
  day: number;
  destination: string;
  locations: Location[];
}
