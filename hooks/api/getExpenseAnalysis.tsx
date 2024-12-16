import fetchExpenseAnalysis from "@/api/expenseAnalysis/fetchExpenseAnalysis";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const getExpenseAnalysis = (tripId: number) => {
  return useQuery({
    queryKey: [queryKeys.getAnalysis, tripId],
    queryFn: () => fetchExpenseAnalysis(tripId),
  });
};
export default getExpenseAnalysis;
