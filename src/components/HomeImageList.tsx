import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Box, SxProps, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  images: IBookImageItem[];
}
interface IBookImageItem {
  id: string;
  title: string;
  pageLink: string;
  imgSrc: string;
  isbn: string;
}

export default function HomeImageList({ images }: Props) {
  return (
    <Box sx={sxHomeImageList}>
      <Swiper
        // spaceBetween={20}
        slidesPerView={"auto"}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Link href={image.pageLink}>
              <img alt={image.title} title={image.title} itemProp="image" className="bookCoverImage" src={image.imgSrc} />
            </Link>
            <Typography sx={sxTruncateText}>{image.title}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

const sxHomeImageList: SxProps = {
  ".swiper-wrapper": {
    margin: "8px",
  },

  ".swiper-slide": {
    width: "140px",
    marginRight: "20px",
    // backgroundColor: "#999999",

    img: {
      height: "200px",
      width: "100%",
      objectFit: "cover",
    },
  },
};

const sxTruncateText: SxProps = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
};
