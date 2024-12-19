import fetchHistory from "@/api/main/fetchHistory";
import { queryKeys } from "@/constants/querykeys";
import { useSuspenseQuery } from "@tanstack/react-query";

const getHistoryQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.history,
    queryFn: fetchHistory,
  });
};
export default getHistoryQuery;
