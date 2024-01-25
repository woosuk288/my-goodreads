import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Box, SxProps } from "@mui/material";
import Link from "next/link";

const sxBookImageList: SxProps = {
  ".swiper-wrapper": {
    margin: "8px",
  },

  ".swiper-slide": {
    width: "140px",
    height: "200px",
    backgroundColor: "#999999",

    img: {
      width: "100%",
      maxHeight: "200px",
      objectFit: "cover",
    },
  },
};

interface Props {
  images: IBookImageItem[];
}
interface IBookImageItem {
  id: string;
  title: string;
  pageLink: string;
  imgSrc: string;
}

export default function BookImageList({ images }: Props) {
  return (
    <Box sx={sxBookImageList}>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Link href={image.pageLink}>
              <img alt={image.title} title={image.title} itemProp="image" className="bookCoverImage" src={image.imgSrc} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
