import fetchPayment from "@/api/payment/fetchPayment";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const getPaymentsQuery = (tripId: number) => {
  return useQuery({
    queryKey: [queryKeys.getPayment, tripId],
    queryFn: () => fetchPayment(tripId),
  });
};
export default getPaymentsQuery;
