"use server";

import { KAKAO_BOOK_SEARCH_URL } from "@/constants/urls";

export const getKakaoBooks = async (params: IKakaoBookApiRequest) => {
  try {
    const requsetParams = new URLSearchParams(params as unknown as Record<string, string>);
    const kakaoBookUrl = `${KAKAO_BOOK_SEARCH_URL}?${requsetParams.toString()}`;
    const response = await fetch(kakaoBookUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "KakaoAK " + process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      },
    });
    const hits: IKakaoBookApiResponse = await response.json();
    return hits;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
