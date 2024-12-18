import { useState } from "react";
import { Location } from "@/types/viewTrip/viewTrip";
import tripUpdateMutation from "../api/tripUpdateMutation";
import { useRecoilValue } from "recoil";
import groupIdState from "@/recoil/groupIdState";

export const useLocationForm = (
  initialLocation: Location,
  onClose: () => void,
  setLocationValue: React.Dispatch<React.SetStateAction<Location>>
) => {
  const { mutate } = tripUpdateMutation();
  const groupId = useRecoilValue(groupIdState);
  const [formData, setFormData] = useState({
    location_id: initialLocation?.location_id || 0,
    name: initialLocation?.name || "",
    address: initialLocation?.address || "",
    visit_time: initialLocation?.visit_time || "",
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

    setLocationValue(updatedLocation);
    mutate({
      groupId: groupId,
      body: updatedLocation,
    });
    await Promise.resolve();
    onClose();
  };

  return { formData, setFormData, handleSubmit };
};
