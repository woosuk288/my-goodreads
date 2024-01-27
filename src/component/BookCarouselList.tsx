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
export default function BookCarouselList() {
  return (
    <Box sx={sxBookCarouselList}>
      <div className="heading_wrapper">
        <BookPageHeading02 title="OTHER BOOKS BY THIS AUTHOR" />
      </div>
      <div className="author_books_wrapper">
        <BookCarouselVerticalItem />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          All books by this author
        </Button>
      </div>

      <div className="heading_wrapper">
        <BookPageHeading02 title="READERS ALSO ENJOYED" />
      </div>
      <div className="reader_realted_list">
        <BookCarouselVerticalItem />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          Readers also enjoyed
        </Button>
      </div>

      <div className="heading_wrapper">
        <BookPageHeading02 title="LISTS FEATURING THIS BOOK" />
      </div>
      <div className="book_featuring_list">
        <BookCarouselHorizontalItem />
      </div>
      <div className="show_more_button_wrapper">
        <Button variant="outlined" href="#">
          Show More Lists
        </Button>
      </div>
    </Box>
  );
}
