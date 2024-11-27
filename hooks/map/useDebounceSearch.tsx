import { MAP_KEY } from "@/constants/api";
import { debounceProps } from "@/types/map/map";
import debounce from "lodash/debounce";
const KAKAO_API_KEY = MAP_KEY;

export const useDebouncedSearch = debounce(
  async ({ searchQuery, setIsSearching, setSearchResults }: debounceProps) => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          searchQuery
        )}&size=15`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        }
      );

      const data = await response.json();
      if (data.documents) {
        setSearchResults(data.documents);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsSearching(false);
    }
  },
  300
);
