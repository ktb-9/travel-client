import { useState } from "react";
import { Location } from "@/types/viewTrip/viewTrip";
import tripUpdateMutation from "../api/tripUpdateMutation";

export const useLocationForm = (
  initialLocation: Location,
  onClose: () => void,
  setLocationValue: React.Dispatch<React.SetStateAction<Location>>
) => {
  const { mutate } = tripUpdateMutation();
  const [formData, setFormData] = useState({
    locationId: initialLocation?.locationId || 0,
    name: initialLocation?.name || "",
    address: initialLocation?.address || "",
    visitTime: initialLocation?.visitTime || "",
    category: initialLocation?.category || "",
    hashtag: initialLocation?.hashtag || "",
    thumbnail: initialLocation?.thumbnail || "",
  });

  const handleSubmit = async () => {
    const formattedHashtags = formData.hashtag
      .split("#")
      .filter((tag: string) => tag)
      .map((tag: string) => `#${tag}`)
      .join(" ");

    const updatedLocation: Location = {
      ...formData,
      hashtag: formattedHashtags || "",
    };
    console.log(updatedLocation);
    setLocationValue(updatedLocation);
    mutate({
      groupId: 1,
      locationId: formData.locationId,
      body: updatedLocation,
    });
    await Promise.resolve();
    onClose();
  };

  return { formData, setFormData, handleSubmit };
};
