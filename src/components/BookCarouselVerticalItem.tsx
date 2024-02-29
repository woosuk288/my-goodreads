import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, SxProps, Typography } from "@mui/material";
import BookRatingStats from "./BookRatingStats";

import NextLink from "next/link";
import { BOOK_PATH } from "@/constants/routes";

const sxBookCarouselVerticalItem: SxProps = {
  ".swiper-wrapper": {
    padding: "12px 16px",
  },

  ".swiper-slide": {
    width: "140px",

    img: {
      maxWidth: "100%",
      height: "200px",
      objectFit: "cover",
    },
  },
  ".book_cover_link_block": {
    color: "inherit",
    textDecoration: "none",
    ":hover .image_item_bar_title": {
      textDecoration: "underline",
    },
  },
  ".book_cover_image": {
    borderRadius: "0 8px 8px 0",
  },

  ".image_item_bar": {
    marginTop: "8px",
  },
  ".image_item_bar_rating_wrapper": {
    ".book_rating_Stats": {
      justifyContent: "start",
    },
    ".MuiTypography-root": {
      fontSize: "0.875rem",
    },
  },

  ".image_item_bar_title": {
    marginBottom: "4px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    lineHeight: "1.3",
    fontWeight: "500",
  },
};

interface Props {
  libBooks: ILibRecommandBooksResponse;
}

export default function BookCarouselVerticalItem({ libBooks }: Props) {
  return (
    <Box sx={sxBookCarouselVerticalItem}>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {libBooks.docs.map(({ book }) => (
          <SwiperSlide key={book.isbn13 + book.publication_year}>
            <NextLink className="book_cover_link_block" href={BOOK_PATH + `/${book.isbn13}`}>
              <img
                className="book_cover_image"
                alt={book.bookname}
                title={book.bookname}
                itemProp="image"
                src={book.bookImageURL}
                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                // src={`${item.img}?w=248&fit=crop&auto=format`}
              />

              <div className="image_item_bar">
                <Typography className="image_item_bar_title" variant="subtitle1">
                  {book.bookname}
                </Typography>
                <Typography variant="subtitle2">{book.authors}</Typography>
                <div className="image_item_bar_rating_wrapper">
                  <BookRatingStats ratingValue={4.19} userRatingCount={3159} hasText={false} />
                </div>
              </div>
            </NextLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
