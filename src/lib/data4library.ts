const DATA_4_LIBRARY_API_URL = "http://data4library.kr/api";

const DEFAULT_PARAMS = {
  authKey: process.env.NEXT_PUBLIC_DATA_4_LIBRARY_API_KEY!,
  format: "json",
};

// export const mergeDefaultParams = (params:Record<string, any>):MergedParams => {

//   return { ...params, ...DEFAULT_PARAMS }
//  }

/**
 * 도서 검색
 */
export const searchBooks = () => {};

/**
 * 3. 인기 대출 도서 조회
 */
export const fetchPopularBooks = async (params?: IPopularLoanBooksRequest) => {
  const baseUrl = `${DATA_4_LIBRARY_API_URL}/loanItemSrch`;
  const queryParams = new URLSearchParams({ ...params, ...DEFAULT_PARAMS } as unknown as Record<string, string>);

  const response = await fetch(`${baseUrl}?${queryParams}`);
  const data: IPopularLoanBooksResponse = (await response.json()).response;

  return data;
};

/**
 * 12. 대출 급상승 도서
 */
export const fetchHotTrendBooks = async (params?: IHotTrendBooksRequest) => {
  const baseUrl = `${DATA_4_LIBRARY_API_URL}/hotTrend`;
  const queryParams = new URLSearchParams({ ...params, ...DEFAULT_PARAMS } as unknown as Record<string, string>);

  const response = await fetch(`${baseUrl}?${queryParams}`);
  const data: IHotTrendBooksResponse = (await response.json()).response;

  return data;
};