import { useTripPlanProps } from "@/types/viewTrip/viewTrip";
import { useCallback } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const useTripPlan = ({
  days,
  setDays,
  setCurrentIndex,
}: useTripPlanProps) => {
  const handleScroll = useCallback(
    (event: any) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(nextIndex);
    },
    [setCurrentIndex]
  );

  const addDays = useCallback(() => {
    const newDays = {
      day: days.length + 1,
      destination: "",
      locations: [],
    };
    setDays((prev) => [...prev, newDays]);
  }, [setDays, days]);
  return { handleScroll, addDays };
};
