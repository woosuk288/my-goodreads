import { getKakaoBooks } from "@/actions/getKakaoBooks";
import BookCarouselList from "@/components/BookCarouselList";
import BookInfo from "@/components/BookInfo";
import BookReviewList from "@/components/BookReviewList";
import { fetchAnalysisByBook, fetchKeywordsByBook, fetchRecommandBooks } from "@/lib/data4library";
import { extractISBN } from "@/lib/utils";

export default async function page({ searchParams }: { searchParams: IKakaoBook }) {
  const isbn = extractISBN(searchParams.isbn);
  console.log("isbn : ", isbn);
  // const kakaoBook = await getKakaoBooks({query: })
  const keywordList = await fetchKeywordsByBook({ isbn13: Number(isbn) });
  // const analysisBook = await fetchAnalysisByBook({isbn13: Number(isbn)  })
  const recommandBookByMania = await fetchRecommandBooks({ isbn13: Number(isbn), type: "mania" });
  const recommandBookByReader = await fetchRecommandBooks({ isbn13: Number(isbn), type: "reader" });
  return (
    <>
      <BookInfo kakaoBook={searchParams} /* analysisBook={analysisBook} */ keywordList={keywordList} />
      <BookReviewList />
      <BookCarouselList recommandBookByMania={recommandBookByMania} recommandBookByReader={recommandBookByReader} />
    </>
  );
}
