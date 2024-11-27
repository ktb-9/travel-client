import { MAP_KEY } from "@/constants/api";

const KAKAO_API_KEY = MAP_KEY;

// 리버스 지오코딩 함수
export const useReverseGeocode = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      const addressDocument = data.documents[0];
      return {
        place_name:
          addressDocument.road_address?.building_name ||
          addressDocument.address.address_name,
        address_name: addressDocument.address.address_name,
        x: longitude.toString(),
        y: latitude.toString(),
        category_group_code: addressDocument.category_group_code || "",
      };
    }
    return null;
  } catch (error) {
    console.error("리버스 지오코딩 중 오류 발생:", error);
    return null;
  }
};
