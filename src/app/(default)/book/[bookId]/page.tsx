import { notFound } from "next/navigation";

import { getKakaoBooks } from "@/actions/getKakaoBooks";
import BookCarouselList from "@/components/BookCarouselList";
import BookInfo from "@/components/BookInfo";
import BookReviewList from "@/components/BookReviewList";
import { fetchAnalysisByBook, fetchKeywordsByBook, fetchPopularBooks, fetchRecommandBooks } from "@/lib/data4library";
import ReadStatusDrawer from "@/components/ReadStatusDrawer";

export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { bookId: string } }) {
  const isbn = params.bookId;
  const kakaoBookResponse = await getKakaoBooks({ query: isbn, target: "isbn", size: 1 });

  // TODO: component에서 불러오기, observer적용
  const keywordList = await fetchKeywordsByBook({ isbn13: Number(isbn) });
  // const analysisBook = await fetchAnalysisByBook({isbn13: Number(isbn)  })
  // const popularBooksResponse = await fetchPopularBooks({ from_age: 20, to_age: 40, kdc: "3;4", pageSize: 10 });

  if (!kakaoBookResponse.meta.total_count || keywordList.error) {
    notFound();
  }

  return (
    <>
      <BookInfo kakaoBook={kakaoBookResponse.documents[0]} /* analysisBook={analysisBook} */ keywordList={keywordList} />
      <ReadStatusDrawer />
      <BookReviewList />
      <BookCarouselList isbn={isbn} />
    </>
  );
}
