type Payment = {
  paymentId: number;
  groupId: number;
  category: string;
  date: string; // ISO 형식의 날짜 문자열
  description: string;
  group: number[]; // 그룹 멤버 ID 배열
  pay: number;
  price: number;
};
type Result = {
  category: string;
  details: { type: "개인" | "공통"; price: number; to: number | null }[]; // 누구에게 보낼지 배열로 처리
  total: number;
};

const useCalculatePayment = (data: Payment[], myId: number): Result[] => {
  const categorized = data
    .filter((item) => (item.group.length === 0 ? item.pay === myId : true)) // 개인은 내가 지불한 것만, 공통은 모두 포함
    .reduce<
      Record<
        string,
        {
          details: {
            type: "개인" | "공통";
            price: number;
            to: number | null;
          }[];
          total: number;
        }
      >
    >(
      (acc, item) => {
        const type = item.group.length === 0 ? "개인" : "공통";

        if (type == "개인" && item.pay == myId) {
          if (!acc[item.category]) {
            acc[item.category] = { details: [], total: 0 };
          }
          acc[item.category].total += item.price;
          acc[item.category].details.push({
            type,
            price: item.price,
            to: null,
          });
        }

        if (
          type == "공통" &&
          item.group.includes(myId) &&
          item.group.length > 0
        ) {
          if (!acc[item.category]) {
            acc[item.category] = { details: [], total: 0 };
          }
          const groupCount = item.group.length || 1;
          const sharedPrice = item.price / groupCount;
          acc[item.category].details.push({
            type,
            price: sharedPrice,
            to: item.pay,
          });
        }
        return acc;
      },

      {}
    );

  // 객체를 배열로 변환
  return Object.entries(categorized).map(([category, { details, total }]) => ({
    category,
    details,
    total, // 카테고리별로 합산된 금액
  }));
};
export default useCalculatePayment;
