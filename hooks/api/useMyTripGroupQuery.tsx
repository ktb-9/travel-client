import fetchMyTripGroup from "@/api/trip/fetchMyTripGroup";
import { queryKeys } from "@/constants/querykeys";
import { useSuspenseQuery } from "@tanstack/react-query";

const useMyTripGroupQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.getMyTrip,
    queryFn: fetchMyTripGroup,
  });
};
export default useMyTripGroupQuery;
