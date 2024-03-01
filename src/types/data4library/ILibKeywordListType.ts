interface ILibKeywordListRequest extends ILibRequest {
  isbn13: number; // 13 자리 ISBN, 필수, 숫자, 10 자리 또는 13 자리 ISBN 혼용 가능
  additionalYN?: "Y" | "N"; // additionalYN 이 없는 경우 N 을 기본값으로 설정. additionalYN 이 Y 인 경우 서지정보(도서명, 저자명, 출판사, 13 자리 ISBN)를 제공
}

interface ILibKeywordListResponse {
  resultNum: number; // 응답결과 수
  items: Array<{ item: ILibKeywordListItem }>; // 항목
  additionalItem?: AdditionalItem;
  error?: string;
}

interface ILibKeywordListItem {
  word: string; // 단어
  weight: string; // 가중치
}

// 도서 정보를 나타내는 인터페이스
interface AdditionalItem {
  bookname: string; // 도서명
  authors: string; // 저자명
  publisher: string; // 출판사
  isbn13: string; // 13 자리 ISBN
}
