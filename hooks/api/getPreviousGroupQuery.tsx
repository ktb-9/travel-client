import fetchPreviousGroup from "@/api/group/fetchPreviousGroup";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const getPreviousGroupQuery = () => {
  return useQuery({
    queryKey: queryKeys.getPrevious,
    queryFn: fetchPreviousGroup,
  });
};
export default getPreviousGroupQuery;
