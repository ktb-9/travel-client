import updatePayment from "@/api/mockApi/payment/updatePayment";
import { useMutation } from "@tanstack/react-query";

const updatePaymentsMutation = () => {
  return useMutation({
    mutationFn: updatePayment,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default updatePaymentsMutation;
