import { useRecoilState } from "recoil";
import { tripPlanState } from "@/recoil/tripPlanState";
import { DayPlan } from "@/types/createTrip/createTrip";

const useTripPlan = () => {
  const [tripPlan, setTripPlan] = useRecoilState(tripPlanState);

  const updateDestination = (day: DayPlan, destination: string) => {
    setTripPlan((prev) => ({
      ...prev,
      days: prev.days.map((d) =>
        d.day === day.day ? { ...d, destination } : d
      ),
    }));
  };

  const deleteLocation = (day: DayPlan, index: number) => {
    setTripPlan((prev) => ({
      ...prev,
      days: prev.days.map((d) =>
        d.day === day.day
          ? {
              ...d,
              locations: d.locations.filter((_, i) => i !== index),
            }
          : d
      ),
    }));
  };

  return { tripPlan, updateDestination, deleteLocation };
};

export default useTripPlan;
