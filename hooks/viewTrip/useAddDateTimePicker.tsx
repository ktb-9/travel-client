const useAddDateTimePicker = (
  onChangeCallback: (formattedTime: string) => void
) => {
  const parseTimeToStringDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
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

      onChangeCallback(formattedTime);
    }
  };

  return { parseTimeToStringDate, handleDateTimeChange };
};

export default useAddDateTimePicker;
