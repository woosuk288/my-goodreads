export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 패딩
  const day = today.getDate().toString().padStart(2, "0"); // 일자를 두 자리로 패딩

  return `${year}-${month}-${day}`;
};

// 날짜 포맷을 변경하는 함수
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 특정 기간 전의 날짜를 계산하는 함수
const getPreviousDate = (baseDate: Date, interval: "week" | "month" | "year"): Date => {
  const newDate = new Date(baseDate);

  switch (interval) {
    case "week":
      newDate.setDate(newDate.getDate() - 7);
      break;
    case "month":
      newDate.setMonth(newDate.getMonth() - 1);
      break;
    case "year":
      newDate.setFullYear(newDate.getFullYear() - 1);
      break;
    default:
      break;
  }

  return newDate;
};

// 주어진 기간 전의 날짜를 YYYY-MM-DD 형식의 문자열로 출력하는 함수
export const getFormattedPreviousDate = (interval: "week" | "month" | "year"): string => {
  const today = new Date();
  const previousDate = getPreviousDate(today, interval);
  return formatDate(previousDate);
};
