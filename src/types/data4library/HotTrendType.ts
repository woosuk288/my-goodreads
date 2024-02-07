interface IHotTrendBooksRequest {
  authKey?: string; // 인증키 (필수)
  startDt?: string; // 검색시작일자 (선택)
  format?: "xml" | "json"; // 응답유형 (xml: xml 타입, json: json 타입, 선택)
}

interface IHotTrendBooksResponse {
  results: IHotTrendResult[];
}

interface IHotTrendResult {
  date: string; // 기준일자
  docs: IHotTrendBook[]; // 도서 목록
}

interface IHotTrendBook {
  no: number; // 순번
  difference: number; // 대출순위 상승폭
  baseWeekRank: number; // 기준일 순위
  pastWeekRank: number; // 전주 순위
  bookname: string; // 도서명
  authors: string; // 저자명
  publisher: string; // 출판사
  publication_year: string; // 출판년도
  isbn13: string; // 13 자리 ISBN
  addition_symbol: string; // ISBN 부가기호
  vol: string; // 권
  class_no: string; // 주제분류
  class_nm: string; // 주제분류명
  bookImageURL: string; // 책표지 URL
  bookDtlUrl: string; // 도서 상세 페이지 URL
}
