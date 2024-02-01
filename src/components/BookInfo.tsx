"use client";

import { useState } from "react";
import WantToReadBottomDrawer from "./WantToReadBottomDrawer";
import NextLink from "next/link";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  SxProps,
  Typography,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ShareIcon from "@mui/icons-material/Share";

import BookPageHeading02 from "./BookPageHeading02";
import BookRatingStats from "./BookRatingStats";
import ExpandMoreBar from "./ExpandMoreBar";
import { REVIEW_EDIT_PATH } from "@/constants/routes";

const sxBookInfo: SxProps = {
  padding: "12px",
  ".book_cover_section": {
    position: "relative",
    height: "200px",
    width: "calc(100% + 24px)",
    left: "-12px",
    top: "-12px",
    padding: "12px",
    backgroundColor: "whitesmoke",
  },
  ".book_cover_wrapper": {
    width: "35%",
    height: "100%",
    margin: "auto",
    filter: "drop-shadow(0 0.2rem 0.8rem rgba(0, 0, 0, 0.2))",
    img: {
      height: "100%",
    },
  },
  ".book_cover_image": {
    borderRadius: "0 8px 8px 0",
  },
  ".book_share_wrapper": {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  ".contributors_wrapper": {
    margin: "8px 0 16px",
    textAlign: "center",
  },
  ".rating_stats_wrapper": {
    paddingTop: "8px",
    paddingBottom: "8px",
    marginBottom: "8px",
    borderTop: "1px solid #CECECE",
    borderBottom: "1px solid #CECECE",
  },
  ".actions_warpper": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    ".wtr_button": {
      margin: "12px 0",
    },
    ".user_rating_stars_wrapper": {
      margin: "8px 0 12px",
    },
  },
  ".edit_date_wrapper": {
    margin: "24px 0",
    ".MuiListItemText-root": {
      flex: "0 0 auto",
    },
  },

  ".external_book_link_list": {
    display: "flex",
    " > li": {
      justifyContent: "center",
    },
    ".external_book_link": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    },
  },

  ".description_heading_wrapper": {
    margin: "40px 0 32px",
  },

  ".genres_wrapper": {
    margin: "12px 0",
  },
  ".genres_list": {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
};

export default function BookInfo() {
  const [rating, setRating] = useState<number | null>(0);
  const [show, setShow] = useState(false);

  const handleShowMore = () => {
    setShow(!show);
  };

  return (
    <Box sx={sxBookInfo}>
      <div className="book_cover_section">
        <div className="book_cover_wrapper">
          <img
            className="book_cover_image"
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1356136579i/16158498.jpg"
            alt="give and take book_cover"
          />
        </div>
        <div className="book_share_wrapper">
          <IconButton>
            <ShareIcon /* sx={{ color: "white" }} */ />
          </IconButton>
        </div>
      </div>
      <div className="book_metadata">
        <div className="title_wrapper">
          <Typography component="h1" align="center" fontSize="1.5rem" fontWeight={500}>
            Give and Take: A Revolutionary Approach to Success
          </Typography>
        </div>

        <div className="contributors_wrapper">
          <Typography component="h3">
            <Link href="#" component={NextLink}>
              Adam M. Grant
            </Link>
          </Typography>
        </div>
        <div className="rating_stats_wrapper">
          <BookRatingStats ratingValue={3.95} userRatingCount={348897} userReviewCount={8786} />
        </div>
        <div className="actions_warpper">
          <div className="wtr_button">
            <WantToReadBottomDrawer />
          </div>
          <div className="user_rating">
            <Typography component="legend" variant="subtitle2">
              내 평점
            </Typography>
            <div className="user_rating_stars_wrapper">
              <Rating
                className="user_rating_stars"
                name="user-rating"
                size="large"
                precision={0.5}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <Button variant="outlined" sx={{ width: "160px" }} href={REVIEW_EDIT_PATH} component={NextLink}>
              리뷰 쓰기
            </Button>
          </div>
        </div>
        <div className="edit_date_wrapper">
          <Divider />
          <List sx={{}}>
            <ListItem sx={{ justifyContent: "center" }}>
              <ListItemAvatar>
                <Avatar>
                  <LocalLibraryIcon fontSize="large" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                // sx={{ flex: 0 }}
                primary={
                  <Link href="#" fontSize="0.875rem" fontWeight={600} component={NextLink}>
                    Add or edit dates read &#10132;
                  </Link>
                }
              />
            </ListItem>
          </List>
          <Divider />
        </div>

        <div className="external_book_wrapper">
          <Divider />
          <List sx={{}} className="external_book_link_list">
            <ListItem>
              <Link href="#" className="external_book_link" component={NextLink}>
                <Avatar sx={{ bgcolor: "#000" }}>
                  <MenuBookOutlinedIcon />
                </Avatar>
                <Typography color="#333" fontSize="0.875rem">
                  Preview
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#" className="external_book_link" component={NextLink}>
                <Avatar sx={{ bgcolor: "#000" }}>
                  <StoreIcon />
                </Avatar>
                <Typography color="#333" fontSize="0.875rem">
                  Other Stores
                </Typography>
              </Link>
            </ListItem>
          </List>
          {/* <div className="external_link_row">
            <div className="preview_link_column"></div>
            <div className="stores_link_column"></div>
          </div> */}
          <Divider />
        </div>

        <div className="description_wrapper">
          <div className="description_heading_wrapper">
            <BookPageHeading02 title="BOOK DESCRIPTION" />
          </div>

          <Collapse in={show} collapsedSize={160}>
            <div className="description_paragraph">
              If you want to build a better future, you must believe in secrets.
              <br />
              <br />
              The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. In Zero to
              One, legendary entrepreneur and investor Peter Thiel shows how we can find singular ways to create those new things. <br />
              <br />
              Thiel begins with the contrarian premise that we live in an age of technological stagnation, even if we’re too distracted by
              shiny mobile devices to notice. Information technology has improved rapidly, but there is no reason why progress should be
              limited to computers or Silicon Valley. Progress can be achieved in any industry or area of business. It comes from the most
              important skill that every leader must master: learning to think for yourself.
              <br />
              <br />
              Doing what someone else already knows how to do takes the world from 1 to n, adding more of something familiar. But when you
              do something new, you go from 0 to 1. The next Bill Gates will not build an operating system. The next Larry Page or Sergey
              Brin won’t make a search engine. Tomorrow’s champions will not win by competing ruthlessly in today’s marketplace. They will
              escape competition altogether, because their businesses will be unique. <br />
              <br />
              Zero to One presents at once an optimistic view of the future of progress in America and a new way of thinking about
              innovation: it starts by learning to ask the questions that lead you to find value in unexpected places.
            </div>
          </Collapse>
          <ExpandMoreBar show={show} onShowMore={handleShowMore} />
        </div>
      </div>

      <div className="genres_wrapper">
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          장르
        </Typography>

        <div className="genres_list">
          <Chip clickable label="자기계발" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
          <Chip clickable label="성공학" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
          <Chip clickable label="인간관계" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
          <Chip clickable label="경제경영" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
        </div>
      </div>
    </Box>
  );
}
