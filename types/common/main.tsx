export type historyState = {
  id: string;
  destination: any;
  mainDescription: string;
  subDescription: string;
  hashTag: string;
};

export type historyType = {
  data: historyState[];
};
export interface upCommingState {
  data: {
    destination: string;
    thumbnail: any;
    day: string;
    nickname: string;
    groupThumbnail: any;
  };
}
export type HotplaceState = {
  id: number;
  image: any;
  mainDescription: string;
  subDescription: string;
};
