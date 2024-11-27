import { MapStateProps, SearchResult } from "@/types/map/map";
import { useDebouncedSearch } from "./useDebounceSearch";
import { useReverseGeocode } from "./useReverseGeocode";
import { categoryMap } from "@/constants/default";

export const useMapLocation = ({
  mapMarkers,
  mapViewRef,
  updateLocationField,
  currentLocationIndex,
  setIsMapSelectionMode,
  setMapSearchQuery,
  setIsSearching,
  setMapSearchResults,
  setMapMarkers,
}: MapStateProps) => {
  // 지도 선택 모드 토글

  const handleMapLocationSelect = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // 현재 마커 목록에서 클릭한 위치와 가장 가까운 마커 찾기
    const closestMarker = mapMarkers.reduce((closest: any, marker: any) => {
      const markerLat = parseFloat(marker.y);
      const markerLng = parseFloat(marker.x);
      const distance = Math.sqrt(
        Math.pow(markerLat - latitude, 2) + Math.pow(markerLng - longitude, 2)
      );

      return distance < (closest?.distance || Infinity)
        ? { marker, distance }
        : closest;
    }, null);

    if (closestMarker) {
      // 가장 가까운 마커의 정보로 location 업데이트
      updateLocationField(
        currentLocationIndex,
        "name",
        closestMarker.marker.place_name
      );
      updateLocationField(
        currentLocationIndex,
        "address",
        closestMarker.marker.address_name
      );
      updateLocationField(
        currentLocationIndex,
        "category",
        categoryMap[closestMarker.marker.category_group_code] || "기타"
      );

      // 지도 선택 모드 종료
      setIsMapSelectionMode(false);
    } else {
      // 검색 결과 마커가 없는 경우 기존 리버스 지오코딩 로직 사용
      const reverseGeocode = async () => {
        const locationInfo = await useReverseGeocode(latitude, longitude);
        if (locationInfo) {
          updateLocationField(
            currentLocationIndex,
            "name",
            locationInfo.place_name
          );
          updateLocationField(
            currentLocationIndex,
            "address",
            locationInfo.address_name
          );
          updateLocationField(
            currentLocationIndex,
            "category",
            categoryMap[locationInfo.category_group_code] || "기타"
          );

          setIsMapSelectionMode(false);
        }
      };
      reverseGeocode();
    }
  };

  const handleMapSearch = (text: string) => {
    setMapSearchQuery(text);
    if (text.length >= 2) {
      useDebouncedSearch({
        searchQuery: text,
        setIsSearching,
        setSearchResults: setMapSearchResults,
        setMapMarkers: setMapMarkers,
      });
    } else {
      setMapSearchResults([]);
      setMapMarkers([]);
    }
  };

  const handleMapSearchResultSelect = (result: SearchResult) => {
    // 선택된 장소로 MapView의 region 이동
    mapViewRef.current?.animateToRegion({
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    // 검색 결과 마커 추가
    setMapMarkers([result]);

    // 검색 결과 초기화
    setMapSearchQuery("");
    setMapSearchResults([]);
  };

  return {
    handleMapLocationSelect,
    handleMapSearch,
    handleMapSearchResultSelect,
  };
};
