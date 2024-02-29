// 분석 요청에 대한 정보를 나타내는 인터페이스
interface ILibAnalysisByBookRequest extends ILibRequest {
  isbn13: number; // 13 자리 ISBN, 필수, 숫자, 10 자리 또는 13 자리 ISBN 혼용 가능
  additionalYN?: "Y" | "N"; // 부가정보 적용여부, 선택, 문자열, 없는 경우 'N'을 기본값으로 설정, 'Y'인 경우 서지정보(도서명, 저자명, 출판사, 13 자리 ISBN)를 제공
}

// 책에 대한 정보를 나타내는 인터페이스
interface ILibBook {
  bookname: string; // 책 이름
  authors: string; // 저자
  publisher: string; // 출판사
  bookImageURL: string; // 책 이미지 URL
  description: string; // 책 설명
  publication_year: string; // 출판 년도
  isbn13: string; // ISBN 번호
  vol: string; // 권
  class_no: string; // 분류 번호
  class_nm: string; // 분류 이름
  loanCnt: number; // 대출 횟수
}

// 대출 이력을 나타내는 인터페이스
interface ILibLoan {
  month: string; // 월
  loanCnt: number; // 대출 횟수
  ranking: number; // 순위
}

// 대출 그룹을 나타내는 인터페이스
interface ILibLoanGrp {
  age: string; // 나이
  gender: string; // 성별
  loanCnt: number; // 대출 횟수
  ranking: number; // 순위
}

// 키워드를 나타내는 인터페이스
interface ILibKeyword {
  word: string; // 단어
  weight: string; // 가중치
}

// 응답을 나타내는 인터페이스
interface ILibAnalysisByBookResponse {
  request: {
    isbn13: string; // ISBN 번호
  };
  book: ILibBook; // 책 정보
  loanHistory: Array<{ loan: ILibLoan }>; // 대출 이력
  loanGrps: Array<{ loanGrp: ILibLoanGrp }>; // 대출 그룹
  keywords: Array<{ keyword: ILibKeyword }>; // 키워드
  coLoanBooks: Array<{ book: ILibBook }>; // 공동 대출 책
  maniaRecBooks: Array<{ book: ILibBook }>; // 매니아 추천 책
  readerRecBooks: Array<{ book: ILibBook }>; // 독자 추천 책
}
