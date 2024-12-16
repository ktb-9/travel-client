import updatePayment from "@/api/payment/updatePayment";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const updatePaymentsMutation = (tripId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: updatePayment,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getPayment, tripId],
      });
      router.back();
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default updatePaymentsMutation;
