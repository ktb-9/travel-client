import fetchTrip from "@/api/trip/fetchTrip";
import { queryKeys } from "@/constants/querykeys";
import { useSuspenseQuery } from "@tanstack/react-query";

const tripQuery = (tripId: number) => {
  return useSuspenseQuery({
    queryKey: [...queryKeys.getTrip, tripId],
    queryFn: () => fetchTrip(tripId),
  });
};
export default tripQuery;
