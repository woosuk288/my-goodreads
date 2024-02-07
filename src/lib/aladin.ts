const authKey = process.env.NEXT_PUBLIC_ALADIN_API_KEY!;
const ALADIN_ITEM_LIST_URL = `http://www.aladin.co.kr/ttb/api`;

const DEFAULT_PARAMS = {
  ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY!,
  output: "js",
};

/**
 * 2) 상품 리스트 API
 */
export const fetchAladinItemList = async (params?: IAladinItemListRequest) => {
  const baseUrl = `${ALADIN_ITEM_LIST_URL}/ItemList.aspx`;
  const queryParams = new URLSearchParams({ ...params, ...DEFAULT_PARAMS } as unknown as Record<string, string>);

  const response = await fetch(`${baseUrl}?${queryParams}`);
  const data: IAladinItemListResponse = await response.json();

  return data;
};
