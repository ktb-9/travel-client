import deletePayment from "@/api/payment/deletePayment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePaymentsMutation = () => {
  return useMutation({
    mutationFn: deletePayment,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default deletePaymentsMutation;
