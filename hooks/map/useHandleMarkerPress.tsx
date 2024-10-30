import { markerProps } from "@/types/map/map";

export const useHandleMarkerPress = ({
  result,
  setSelectedPlace,
  setShowModal,
}: markerProps) => {
  setSelectedPlace({
    name: result.place_name,
    address: result.road_address_name || result.address_name,
    coordinates: {
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
    },
  });
  setShowModal(true);
};
