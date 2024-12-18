import postPayment from "@/api/payment/postPayment";
import { queryKeys } from "@/constants/querykeys";
import tripIdState from "@/recoil/tripIdState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRecoilValue } from "recoil";

const addPaymentsMutation = () => {
  const tripId = useRecoilValue(tripIdState);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: postPayment,
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
export default addPaymentsMutation;
