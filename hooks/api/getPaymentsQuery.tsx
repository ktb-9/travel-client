import fetchPayment from "@/api/mockApi/payment/fetchPayment";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const getPaymentsQuery = (groupId: number) => {
  return useQuery({
    queryKey: queryKeys.getPayment,
    queryFn: () => fetchPayment(groupId),
  });
};
export default getPaymentsQuery;
