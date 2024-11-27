import { Alert } from "react-native";
import deleteLocationMutation from "../api/deleteLocationMutation";
import { tripDeleteProps } from "@/types/viewTrip/viewTrip";

export const useTripDelete = ({
  location,
  setDays,
  tripId,
}: tripDeleteProps) => {
  const { mutate } = deleteLocationMutation(tripId);
  const onDelete = (locationId: number) => {
    mutate(locationId);

    setDays((prev) =>
      prev.map((value) => ({
        ...value,
        locations: value.locations.filter(
          (item) => item.location_id !== locationId
        ),
      }))
    );
  };

  const handleDelete = () => {
    Alert.alert("장소 삭제", "이 장소를 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: () => onDelete(location.location_id),
        style: "destructive",
      },
    ]);
  };

  return { handleDelete };
};
