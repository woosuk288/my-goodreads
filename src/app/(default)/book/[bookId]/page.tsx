import { notFound } from "next/navigation";

import { getKakaoBooks } from "@/actions/getKakaoBooks";
import BookCarouselList from "@/components/BookCarouselList";
import BookInfo from "@/components/BookInfo";
import BookReviewList from "@/components/BookReviewList";
import { fetchAnalysisByBook, fetchKeywordsByBook, fetchPopularBooks, fetchRecommandBooks } from "@/lib/data4library";
import ReadStatusDrawer from "@/components/ReadStatusDrawer";
import { fetchAladinItemLookUp } from "@/lib/aladin";

// export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function page({ params }: { params: { bookId: string } }) {
  const isbn = params.bookId;

  const [aladinBookResponse, kakaoBookResponse, keywordList] = await Promise.all([
    fetchAladinItemLookUp({ ItemId: isbn, Version: "20131101", OptResult: { ratingInfo: true } }),
    getKakaoBooks({ query: isbn, target: "isbn", size: 1 }),
    fetchKeywordsByBook({ isbn13: Number(isbn) }),
  ]);

  // const analysisBook = await fetchAnalysisByBook({isbn13: Number(isbn)  })
  // const popularBooksResponse = await fetchPopularBooks({ from_age: 20, to_age: 40, kdc: "3;4", pageSize: 10 });

  if (!kakaoBookResponse.meta.total_count || keywordList.error || aladinBookResponse.error) {
    notFound();
  }

  return (
    <>
      <BookInfo
        aladinBook={aladinBookResponse.item[0]}
        kakaoBook={kakaoBookResponse.documents[0]}
        /* analysisBook={analysisBook} */
        keywordList={keywordList}
      />
      <ReadStatusDrawer />
      <BookReviewList />
      <BookCarouselList isbn={isbn} />
    </>
  );
}
