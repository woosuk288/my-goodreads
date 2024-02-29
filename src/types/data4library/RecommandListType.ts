interface ILibRecommandBooksRequest extends ILibRequest {
  isbn13: number; // 13 자리 ISBN, 필수, 숫자, 10 자리 또는 13 자리 ISBN 혼용 가능
  type: "mania" | "reader"; // [mania: 마니아를 위한 추천 도서] [reader: 다독자를 위한 추천 도서]
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
