import { useState } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "@/recoil/tripState";
import { Location } from "@/types/viewTrip/viewTrip";

export const useLocationForm = (
  initialLocation: Location,
  day: number,
  onClose: () => void
) => {
  const [formData, setFormData] = useState({
    name: initialLocation?.name || "",
    address: initialLocation?.address || "",
    visitTime: initialLocation?.visitTime || "",
    category: initialLocation?.category || "",
    hashtag: initialLocation?.hashtag || "",
  });
  const [body, setBody] = useRecoilState(locationState);

  const handleSubmit = async () => {
    const formattedHashtags = formData.hashtag
      .split("#")
      .filter((tag: string) => tag)
      .map((tag: string) => `#${tag}`)
      .join(" ");

    const updatedLocation = {
      ...formData,
      thumbnail: initialLocation?.thumbnail || "",
      hashtag: formattedHashtags || "",
    };

    const days = body.days || [];
    const targetIndex = days.findIndex((prev) => prev.day === day);

    if (targetIndex !== -1) {
      const locationIndex = days[targetIndex].locations.findIndex(
        (loc) =>
          loc.name === initialLocation.name &&
          loc.visitTime === initialLocation.visitTime
      );

      if (locationIndex !== -1) {
        const updatedDays = [...days];
        updatedDays[targetIndex] = {
          ...updatedDays[targetIndex],
          locations: [...updatedDays[targetIndex].locations],
        };
        updatedDays[targetIndex].locations[locationIndex] = updatedLocation;

        const newBody = {
          ...body,
          days: updatedDays,
        };

        setBody(newBody);
        await Promise.resolve();
        onClose();
      }
    }
  };

  return { formData, setFormData, handleSubmit };
};
