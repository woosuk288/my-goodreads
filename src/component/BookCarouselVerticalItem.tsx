import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, SxProps, Typography } from "@mui/material";
import BookRatingStats from "./BookRatingStats";

import Link from "../Link";

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

export default function BookCarouselVerticalItem() {
  return (
    <Box sx={sxBookCarouselVerticalItem}>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {itemData.map((item) => (
          <SwiperSlide key={item.title}>
            <Link className="book_cover_link_block" href={item.img}>
              <img
                className="book_cover_image"
                alt={item.title}
                title={item.title}
                itemProp="image"
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
              />

              <div className="image_item_bar">
                <Typography className="image_item_bar_title" variant="subtitle1">
                  {item.title}
                </Typography>
                <Typography variant="subtitle2">{item.author}</Typography>
                <div className="image_item_bar_rating_wrapper">
                  <BookRatingStats ratingValue={4.19} userRatingCount={3159} hasText={false} />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "The Sovereign Individual: Mastering the Transition to the Information Age",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];
