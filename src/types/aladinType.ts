interface IAladinItemListRequest {
  TTBKey?: string; // 부여받은 TTBKey값
  QueryType: "ItemNewAll" | "ItemNewSpecial" | "ItemEditorChoice" | "Bestseller" | "BlogBest"; // 리스트 종류
  SearchTarget?: "Book" | "Foreign" | "Music" | "DVD" | "Used" | "eBook" | "All"; // 조회 대상 Mall
  SubSearchTarget?: "Book" | "Music" | "DVD"; // SearchTarget이 Used일 경우 서브 Mall 지정
  Start?: number; // 검색결과 시작페이지
  MaxResults?: number; // 검색결과 한 페이지당 최대 출력 개수
  Cover?: "Big" | "MidBig" | "Mid" | "Small" | "Mini" | "None"; // 표지크기
  CategoryId?: number; // 특정 분야로 검색결과를 제한함
  Output?: "xml" | "js"; // 출력방법
  Partner?: string; // 제휴와 관련한 파트너코드
  includeKey?: number; // includeKey가 1인 경우 결과의 상품페이지 링크값에 TTBKey가 포함됨
  InputEncoding?: string; // 검색어의 인코딩 값을 설정
  Version?: "20131101"; // 검색API의 Version
  outofStockfilter?: number; // 품절/절판 등 재고 없는 상품 필터링
  Year?: number; // 베스트셀러를 조회할 주간의 연도
  Month?: number; // 베스트셀러를 조회할 주간의 월
  Week?: number; // 베스트셀러를 조회할 주간
  OptResult?: string[]; // 부가 정보
}

interface IAladinItemListResponse {
  version: string; // API 버전
  logo: string; // 로고 이미지 URL
  title: string; // 제목
  link: string; // 링크
  pubDate: string; // 발행일
  totalResults: number; // 전체 결과 수
  startIndex: number; // 시작 인덱스
  itemsPerPage: number; // 페이지당 결과 수
  query: string; // 검색 쿼리
  searchCategoryId: number; // 검색 카테고리 ID
  searchCategoryName: string; // 검색 카테고리 이름
  item: AladinItemBook[]; // 도서 목록
}

interface AladinItemBook {
  title: string; // 도서 제목
  link: string; // 도서 링크
  author: string; // 저자
  pubDate: string; // 출판일
  description: string; // 설명
  isbn: string; // ISBN
  isbn13: string; // 13자리 ISBN
  itemId: number; // 아이템 ID
  priceSales: number; // 판매가
  priceStandard: number; // 표준가
  mallType: string; // 쇼핑몰 타입
  stockStatus: string; // 재고 상태
  mileage: number; // 마일리지
  cover: string; // 표지 이미지 URL
  categoryId: number; // 카테고리 ID
  categoryName: string; // 카테고리 이름
  publisher: string; // 출판사
  salesPoint: number; // 판매 지점
  adult: boolean; // 성인용 여부
  fixedPrice: boolean; // 정가제 여부
  customerReviewRank: number; // 고객 평점 랭킹
  subInfo: Record<string, unknown>; // 부가 정보
}
