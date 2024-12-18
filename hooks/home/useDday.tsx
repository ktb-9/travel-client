const useDday = (date: string) => {
  const day = date.split("~").shift();
  const currentDate = new Date();
  // 날짜 문자열을 파싱하는 함수
  const parseDate = (dateStr: string) => {
    // "2024.12.17" 형식을 "2024-12-17" 형식으로 변환
    const [year, month, day] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
  };
  const targetDateObj = parseDate(day || "");

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
};
export default useDday;
