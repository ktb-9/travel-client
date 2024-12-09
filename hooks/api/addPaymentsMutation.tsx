import postPayment from "@/api/payment/postPayment";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const addPaymentsMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: postPayment,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: queryKeys.getPayment,
      });
      router.back();
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default addPaymentsMutation;
