import fetchTrip from "@/api/mockApi/trip/fetchTrip";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const tripQuery = (groupId: number) => {
  return useQuery({
    queryKey: queryKeys.getTrip,
    queryFn: () => fetchTrip(groupId),
  });
};
export default tripQuery;
