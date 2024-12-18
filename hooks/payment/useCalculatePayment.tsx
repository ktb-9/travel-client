type Payment = {
  paymentId: number;
  tripId: number;
  category: string;
  date: string;
  description: string;
  group: { user_id: number; nickname: string }[];
  pay: number;
  price: number;
};

type Result = {
  category: string;
  details: {
    type: "개인" | "공통";
    price: number;
    to: string | undefined;
  }[];
  total: number;
};

const useCalculatePayment = (data: Payment[], myId: number): Result[] => {
  const categorized = data
    .filter((item) => (item.group.length === 0 ? item.pay === myId : true))
    .reduce<
      Record<
        string,
        {
          details: {
            type: "개인" | "공통";
            price: number;
            to: string | undefined;
          }[];
          total: number;
        }
      >
    >((acc, item) => {
      const type = item.group.length === 0 ? "개인" : "공통";
      const groupUserIds = item.group.map((g) => g.user_id);

      const payerInfo = item.group.find((g) => g.user_id === item.pay) || null;

      if (type == "개인" && item.pay == myId) {
        if (!acc[item.category]) {
          acc[item.category] = { details: [], total: 0 };
        }
        acc[item.category].total += item.price;
        acc[item.category].details.push({
          type,
          price: item.price,
          to: undefined,
        });
      }

      if (
        type == "공통" &&
        groupUserIds.includes(myId) &&
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
          to: payerInfo?.nickname,
        });
      }
      return acc;
    }, {});

  // 객체를 배열로 변환
  return Object.entries(categorized).map(([category, { details, total }]) => ({
    category,
    details,
    total,
  }));
};

export default useCalculatePayment;
