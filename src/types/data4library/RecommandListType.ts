interface ILibRecommandBooksRequest {
  authKey?: string; // 인증키, 필수, 문자열
  isbn13: number; // 13 자리 ISBN, 필수, 숫자, 10 자리 또는 13 자리 ISBN 혼용 가능
  type: "mania" | "reader"; // [mania: 마니아를 위한 추천 도서] [reader: 다독자를 위한 추천 도서]
  format?: "xml" | "json"; // 응답유형, 선택, 문자열, 없을 경우 'xml' 타입으로 제공
}

interface ILibRecommandBook {
  no: number; // 순번
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
}

interface ILibRecommandBooksDocs {
  book: ILibRecommandBook; // 도서
}

interface ILibRecommandBooksResponse {
  resultNum: number; // 응답결과 건수
  docs: ILibRecommandBooksDocs[]; // 목록
}
