import { currentLocationProps } from "@/types/map/map";
import * as Location from "expo-location";

export const useGetCurrentLocation = async ({
  setCurrentLocation,
  setSelectedLocation,
  setLoading,
}: currentLocationProps) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("위치 권한이 거부되었습니다");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setCurrentLocation({ latitude, longitude });
    setSelectedLocation({ latitude, longitude });
    setLoading(false);
  } catch (error) {
    console.error("현재 위치를 가져오는 중 오류 발생:", error);
    setLoading(false);
  }
};
