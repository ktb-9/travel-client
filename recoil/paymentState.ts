import { PaymentEditState } from "@/types/payment/payment";
import { atom } from "recoil";

const paymentState = atom<PaymentEditState[]>({
  key: "paymentState",
  default: [],
});
export default paymentState;
