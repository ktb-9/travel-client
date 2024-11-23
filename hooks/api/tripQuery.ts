import fetchTrip from "@/api/trip/fetchTrip";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const tripQuery = (tripId: number) => {
  return useQuery({
    queryKey: [...queryKeys.getTrip, tripId],
    queryFn: () => fetchTrip(tripId),
  });
};
export default tripQuery;
