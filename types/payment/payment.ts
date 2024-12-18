export interface PaymentState {
  tripId: number;
  category: string;
  description: string;
  date: string;
  price: number;
  pay: number;
  group: number[];
}
export interface PaymentEditState {
  tripId: number;
  paymentId: number;
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
export interface PaymentEditType {
  value: PaymentEditState;
  SetValue: React.Dispatch<React.SetStateAction<PaymentEditState[]>>;
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
  user_id: number;
  nickname: string;
  isMe?: boolean;
  profile_image: string;
}
export interface UserEditType {
  user_id: number;
  group?: Array<{ user_id: number }>;
  nickname: string;
  isMe?: boolean;
  profile_image: string;
}
export interface groupMemberType {
  user_id: string;
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
export type ExpenseDetail = {
  type: "개인" | "공통";
  price: number;
  to: string | undefined;
};

export type ExpenseResult = {
  category: string;
  details: ExpenseDetail[];
  total: number;
};

export type PersonalExpense = {
  category: string;
  total: number;
};

export type CommonExpense = {
  category: string;
  price: number;
  to: string | undefined;
};
