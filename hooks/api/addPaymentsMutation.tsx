import postPayment from "@/api/mockApi/payment/postPayment";
import { useMutation } from "@tanstack/react-query";

const addPaymentsMutation = () => {
  return useMutation({
    mutationFn: postPayment,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default addPaymentsMutation;
