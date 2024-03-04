// [KakaoBookApiRequest](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book-request-query)
interface IKakaoBookApiRequest {
  query: string; // 검색어
  sort?: "accuracy" | "recency"; // 정렬 옵션: 정확도(accuarcy), 최신순(recency)
  page?: number; // 결과 페이지 번호 (default: 1)
  size?: number; // 한 페이지에 보여질 문서의 개수 (default: 10, max: 50)
  target?: "title" | "isbn" | "publisher" | "person"; // 검색 필드 옵션
  v?: string; // API 버전 (default: 3)
}

// [Kakao Book API 응답 인터페이스] (https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book-response-body)
interface IKakaoBookApiResponse {
  documents: Array<IKakaoBook>;
  meta: {
    total_count: number; // 검색된 문서의 총 개수
    pageable_count: number; // total_count 중에 노출 가능 문서의 개수
    is_end: boolean; // 현재 페이지가 마지막 페이지인지 여부
  };
}

interface IKakaoBook {
  title: string; // 책 제목
  contents: string; // 책 소개
  url: string; // 도서 상세 URL
  isbn: string; // 국제 표준 도서 번호
  datetime: string; // 도서 출판날짜, ISO 8601 형식 [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz]
  authors: Array<string>; // 저자 목록
  publisher: string; // 출판사
  translators: Array<string>; // 도서 번역자 리스트
  price: number; // 도서 정가
  sale_price: number; // 도서 판매가
  thumbnail: string; // 도서 표지 미리보기 URL
  status: any; // unknown // 도서 판매 상태 정보 (정상, 품절, 절판 등) 상황에 따라 변동 가능성이 있으므로 문자열 처리 지양, 단순 노출 요소로 활용 권장
}
