export interface PaymentState {
  category: string;
  description: string;
  date: string;
  price: number;
  pay: number;
  group: number[];
}
export interface PaymentType {
  value: PaymentState;
  SetValue: React.Dispatch<React.SetStateAction<PaymentState[]>>;
  index: number;
}
