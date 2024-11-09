import fetchHotplace from "@/api/mockApi/main/hotPlace";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const hotPlaceQuery = () => {
  return useQuery({
    queryKey: queryKeys.hotplace,
    queryFn: fetchHotplace,
  });
};
export default hotPlaceQuery;
