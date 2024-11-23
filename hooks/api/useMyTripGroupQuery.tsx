import fetchMyTripGroup from "@/api/trip/fetchMyTripGroup";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const useMyTripGroupQuery = () => {
  return useQuery({
    queryKey: queryKeys.getMyTrip,
    queryFn: fetchMyTripGroup,
  });
};
export default useMyTripGroupQuery;
