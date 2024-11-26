export const formatPrice = (price: number): string => {
  return Math.round(price).toLocaleString("ko-KR");
};

export const calculateBarWidth = (
  amount: number,
  totalAmount: number
): string => {
  return `${(amount / totalAmount) * 100}%`;
};
