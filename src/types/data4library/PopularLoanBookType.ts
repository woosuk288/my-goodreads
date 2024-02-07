interface IPopularLoanBooksRequest {
  authKey?: string; // 인증키 (필수)
  startDt?: string; // 검색시작일자 (선택)
  endDt?: string; // 검색종료일자 (선택)
  gender?: number[]; // 성별 (다중선택 가능, 선택)
  from_age?: number; // 시작연령 (선택)
  to_age?: number; // 종료연령 (선택)
  age?: number[]; // 연령 (다중선택 가능, 선택)
  region?: number[]; // 지역 (다중선택 가능, 선택)
  dtl_region?: number[]; // 세부지역 (다중선택 가능, 선택)
  book_dvsn?: "big" | "oversea"; // 도서구분 (big: 큰글씨도서, oversea: 국외도서, 선택)
  addCode?: number[]; // ISBN 부가기호 (다중선택 가능, 선택)
  kdc?: number[]; // 대주제 (다중선택 가능, 선택)
  dtl_kdc?: number[]; // 세부주제 (다중선택 가능, 선택)
  pageNo?: number; // 페이지번호 (응답결과가 제공되는 페이지 번호 지정, 선택)
  pageSize?: number; // 페이지크기 (한 페이지당 제공되는 도서목록 개수 지정, 선택)
  format?: "xml" | "json"; // 응답유형 (xml: xml 타입, json: json 타입, 선택)
}

// 응답 메시지 명세를 기반으로 한 도서 정보 인터페이스
interface IPopularLoanBooksDoc {
  no: number;
  ranking: number;
  bookname: string;
  authors: string;
  publisher: string;
  publication_year: string;
  isbn13: string;
  addition_symbol: number;
  vol: number;
  class_no: number;
  class_nm: string;
  loan_count: number;
  bookImageURL: string;
  bookDtlUrl: string;
}

// 응답 메시지 명세를 기반으로 한 API 응답 인터페이스
interface IPopularLoanBooksResponse {
  request: IPopularLoanBooksRequest;
  resultNum: number;
  numFound: number;
  docs: { doc: IPopularLoanBooksDoc }[];
}
