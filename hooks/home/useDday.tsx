const useDday = (date?: string) => {
  // date가 없거나 유효하지 않은 경우 기본값 반환
  if (!date) {
    return "날짜 정보 없음";
  }

  try {
    const day = date.split("~").shift();
    if (!day) {
      return "날짜 정보 없음";
    }

    const currentDate = new Date();

    // 날짜 문자열을 파싱하는 함수
    const parseDate = (dateStr: string) => {
      // 날짜 형식 검증 (YYYY.MM.DD)
      const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
      if (!dateRegex.test(dateStr)) {
        throw new Error("Invalid date format");
      }

      // "2024.12.17" 형식을 "2024-12-17" 형식으로 변환
      const [year, month, day] = dateStr.split(".");
      const parsedDate = new Date(`${year}-${month}-${day}`);

      // 유효한 날짜인지 확인
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date");
      }

      return parsedDate;
    };

    const targetDateObj = parseDate(day);

    // 두 날짜의 차이를 밀리초 단위로 계산
    const diffTime = targetDateObj.getTime() - currentDate.getTime();

    // 밀리초를 일 단위로 변환
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // D-day 형식의 문자열 생성
    const dDayText =
      diffDays === 0
        ? "D-Day"
        : diffDays > 0
        ? `D-${diffDays}`
        : `D+${Math.abs(diffDays)}`;

    return dDayText;
  } catch (error) {
    console.error("D-day 계산 중 오류 발생:", error);
    return "날짜 형식 오류";
  }
};

export default useDday;
