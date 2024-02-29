"use client";

import { Box, Button, SxProps } from "@mui/material";
import BookPageHeading02 from "./BookPageHeading02";
import BookCarouselVerticalItem from "./BookCarouselVerticalItem";
import BookCarouselHorizontalItem from "./BookCarouselHorizontalItem";

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
  recommandBookByMania: ILibRecommandBooksResponse;
  recommandBookByReader: ILibRecommandBooksResponse;
}

export default function BookCarouselList({ recommandBookByMania, recommandBookByReader }: Props) {
  return (
    <Box sx={sxBookCarouselList}>
      <div className="heading_wrapper">
        <BookPageHeading02 title="비슷한 분야의 다른 책들" /> {/* OTHER BOOKS BY THIS AUTHOR */}
      </div>
      <div className="author_books_wrapper">
        <BookCarouselVerticalItem libBooks={recommandBookByMania} />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          {/* All books by this author */}
          All books by this moment
        </Button>
      </div>

      <div className="heading_wrapper">
        <BookPageHeading02 title="이 책의 독자들이 좋아해요" /> {/* READERS ALSO ENJOYED" */}
      </div>
      <div className="reader_realted_list">
        <BookCarouselVerticalItem libBooks={recommandBookByReader} />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          Readers also enjoyed
        </Button>
      </div>

      {/* <div className="heading_wrapper">
        <BookPageHeading02 title="관심 주제로 추천하는 인기 도서 (LISTS FEATURING THIS BOOK)" } />
        
      </div>
      <div className="book_featuring_list">
        <BookCarouselHorizontalItem  />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          Show More Lists
        </Button>
      </div> */}
    </Box>
  );
}
