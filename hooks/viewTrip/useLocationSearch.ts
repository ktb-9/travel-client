import { MAP_KEY } from "@/constants/api";
const KAKAO_API_KEY = MAP_KEY;

export const useLocationSearch = async (searchQuery: string) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        searchQuery
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    if (data.documents && data.documents.length > 0) {
      const exectMatch = data.documents.find(
        (item: { place_name: string }) => item.place_name == searchQuery
      );
      return exectMatch.place_url;
    } else {
      console.warn("위치 검색중 결과를 찾을수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
  }
};
