import fetchPaymentMembers from "@/api/payment/fetchPaymentMembers";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const getPaymentMembersQuery = (tripId: number) => {
  return useQuery({
    queryKey: [queryKeys.getPaymentMember, tripId],
    queryFn: () => fetchPaymentMembers(tripId),
  });
};
export default getPaymentMembersQuery;
