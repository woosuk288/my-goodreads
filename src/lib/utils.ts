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

// isbn13을 우선적으로 가져오고, 없으면 isbn10 return
export const extractISBN = (input: string): string => {
  const isbnList = input.split(/\s+/); // 공백으로 분리된 ISBN 리스트
  for (const isbn of isbnList) {
    if (isbn.length === 13 && /^\d+$/.test(isbn)) {
      return isbn; // ISBN-13 값이면 반환
    }
  }
  // ISBN-13 값이 없는 경우 ISBN-10 값을 반환
  for (const isbn of isbnList) {
    if (isbn.length === 10 && /^\d{9}[\dX]$/.test(isbn)) {
      return isbn; // ISBN-10 값이면 반환
    }
  }
  return ""; // ISBN이 없는 경우 빈 문자열 반환
};

export async function findBookReadStatus(booksWant: string[], booksReading: string[], booksRead: string[]) {
  // return want, reading, read
}
