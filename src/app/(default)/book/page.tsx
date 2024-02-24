import BookCarouselList from "@/components/BookCarouselList";
import BookInfo from "@/components/BookInfo";
import BookReviewList from "@/components/BookReviewList";

export default function page({ searchParams }: { searchParams: IKakaoBook }) {
  return (
    <>
      <BookInfo kakaobook={searchParams} />
      <BookReviewList />
      <BookCarouselList />
    </>
  );
}
