import fetchHotplace from "@/api/mockApi/main/hotPlace";
import { queryKeys } from "@/constants/querykeys";
import { useSuspenseQuery } from "@tanstack/react-query";

const hotPlaceQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.hotplace,
    queryFn: fetchHotplace,
  });
};
export default hotPlaceQuery;
