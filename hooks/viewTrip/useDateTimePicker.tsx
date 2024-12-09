interface dateTimeProps {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      location_id: number;
      name: string;
      address: string;
      visit_time: string;
      category: string;
      hashtag: string;
      thumbnail: string;
    }>
  >;
}
const useDateTimePicker = ({ setFormData }: dateTimeProps) => {
  const parseTimeToStringDate = (timeString: string): Date => {
    //14:00로 분리
    const [hours, minutes] = timeString.split(":").map(Number);
    // 스트링을 날짜 포맷으로
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleDateTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setFormData((prev) => ({ ...prev, visit_time: formattedTime }));
    }
  };

  return { parseTimeToStringDate, handleDateTimeChange };
};
export default useDateTimePicker;
