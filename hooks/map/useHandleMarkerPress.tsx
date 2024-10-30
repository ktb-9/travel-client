import { SearchResult, SelectedPlace } from "@/types/map/map";
interface markerProps {
  result: SearchResult;
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
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
