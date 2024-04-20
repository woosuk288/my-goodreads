"use client";

import { Box, Button, SxProps, Typography } from "@mui/material";
import BookPageHeading from "./BookPageHeading";
import BookCarouselVerticalList from "./BookCarouselVerticalList";
// import BookCarouselHorizontalList from "./BookCarouselHorizontalList";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";
import { fetchRecommandBooks } from "@/lib/data4library";

const sxBookCarouselList: SxProps = {
  marginBottom: "70px",
  ".heading_wrapper": {
    margin: "40px 0 32px",
  },
  ".show_more_button_wrapper": {
    marginTop: "16px",
    textAlign: "center",
  },
};

interface Props {
  isbn: string;
}

export default function BookCarouselList({ isbn }: Props) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    rootMargin: "32px",
    threshold: 0,
    triggerOnce: true,
  });

  const { data, isLoading, error } = useSWR(inView ? `api/recommand-books/${isbn}` : null, async () => {
    const [maniaData, readerData] = await Promise.all([
      fetchRecommandBooks({ isbn13: Number(isbn), type: "mania" }),
      fetchRecommandBooks({ isbn13: Number(isbn), type: "reader" }),
    ]);
    return { maniaData, readerData };
  });

  return (
    <Box sx={sxBookCarouselList} ref={ref}>
      {error ? (
        <div>데이터를 가져오는 중에 오류가 발생했습니다!</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        data && (
          <>
            <div className="heading_wrapper">
              <BookPageHeading title="비슷한 분야의 다른 책들" /> {/* OTHER BOOKS BY THIS AUTHOR */}
            </div>
            {data.maniaData.resultNum === 0 ? (
              <Typography variant="body2" align="center" color="text.secondary">
                죄송합니다. 아직 추천도서가 없습니다.
              </Typography>
            ) : (
              <>
                <div className="author_books_wrapper">
                  <BookCarouselVerticalList libBooks={data.maniaData} />
                  {/* recommandBookByMania */}
                </div>
                <div className="show_more_button_wrapper">
                  <Button variant="outlined" href="#">
                    {/* All books by this author */}
                    All books by this genre
                  </Button>
                </div>
              </>
            )}
            <div className="heading_wrapper">
              <BookPageHeading title="이 책의 독자들이 좋아해요" /> {/* READERS ALSO ENJOYED" */}
            </div>
            {data.readerData.resultNum === 0 ? (
              <Typography variant="body2" align="center" color="text.secondary">
                죄송합니다. 아직 추천도서가 없습니다.
              </Typography>
            ) : (
              <>
                <div className="reader_realted_list">
                  <BookCarouselVerticalList libBooks={data.readerData} /> {/* recommandBookByReader */}
                </div>
                <div className="show_more_button_wrapper">
                  <Button variant="outlined" href="#">
                    Readers also enjoyed
                  </Button>
                </div>
              </>
            )}
          </>
        )
      )}
      {/* <div className="heading_wrapper">
        <BookPageHeading title="관심 주제로 추천하는 인기 도서 (LISTS FEATURING THIS BOOK)" } />
        
      </div>
      <div className="book_featuring_list">
        <BookCarouselHorizontalList  />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          Show More Lists
        </Button>
      </div> */}
    </Box>
  );
}
