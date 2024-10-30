import { CurrentLocation, SearchResult } from "@/types/map/map";
interface locationSelectState {
  result: SearchResult;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<CurrentLocation | null>
  >;
  setMarkers: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setSearchResults: (results: SearchResult[]) => void;
  setSearchQuery: (query: string) => void;
}
export const useHandleLocationSelect = ({
  result,
  setSelectedLocation,
  setMarkers,
  setSearchResults,
  setSearchQuery,
}: locationSelectState) => {
  setSelectedLocation({
    latitude: parseFloat(result.y),
    longitude: parseFloat(result.x),
  });
  // 선택된 위치를 마커 목록에 추가
  setMarkers([result]);
  setSearchResults([]);
  setSearchQuery("");
};
