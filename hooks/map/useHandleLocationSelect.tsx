import { locationSelectState } from "@/types/map/map";

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
