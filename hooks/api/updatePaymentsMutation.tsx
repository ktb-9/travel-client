import updatePayment from "@/api/payment/updatePayment";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updatePaymentsMutation = (tripId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePayment,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.getPayment, tripId],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default updatePaymentsMutation;
