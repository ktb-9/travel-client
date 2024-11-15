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
export interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  currentDate: Date;
}
export interface categoryModalState {
  isDropdownVisible: boolean;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCategorySelect: (category: string) => void;
}

export interface UserType {
  id: number;
  name: string;
  isMe?: boolean;
}
export interface UserListProps {
  value: PaymentType["value"];
  onPaymentUserCheck: (id: number) => void;
  onUserGroupAdd: (id: number) => void;
}
export interface PaymentInputProps {
  value: PaymentType["value"];
  onInputChange: (field: string, value: string) => void;
  onCategorySelect: (category: string) => void;
  onDateSelect: (date: Date) => void;
}
