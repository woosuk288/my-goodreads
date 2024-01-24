import Link from "../Link";
import WantToReadBottomDrawer from "./WantToReadBottomDrawer";
import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
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

const sxBookInfo: SxProps = {
  padding: "12px",
  ".book_cover_wrapper": {
    margin: "auto",
    width: "35%",
  },
  ".book_cover_image": {
    filter: "drop-shadow(0 0.2rem 0.8rem rgba(0, 0, 0, 0.2))",
    img: {
      width: "100%",
    },
  },
  ".contributors_wrapper": {
    margin: "8px 0 16px",
    textAlign: "center",
  },
  ".rating_stats_wrapper": {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    paddingTop: "8px",
    paddingBottom: "8px",
    marginBottom: "8px",
    borderTop: "1px solid #CECECE",
    borderBottom: "1px solid #CECECE",

    ".rating_stats_col": {
      ".static_stars": {
        marginRight: "4px",
      },
      display: "flex",
      alignItems: "center",
      ":not(:first-child)": {
        ":before": { padding: "4px", content: '"\\B7"' },
      },
      ".MuiTypography-root": {
        fontSize: "0.75rem",
      },
    },
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
};

export default function BookInfo() {
  const [rating, setRating] = useState<number | null>(0);

  return (
    <Box sx={sxBookInfo}>
      <div className="book_cover_wrapper">
        <div className="book_cover_image">
          <img
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1356136579i/16158498.jpg"
            alt="give and take book_cover"
          />
        </div>
      </div>
      <div className="book_share_wrapper">
        <IconButton>shareIcon</IconButton>
      </div>
      <div className="book_metadata">
        <div className="title_wrapper">
          <Typography component="h1" align="center" fontSize="1.5rem" fontWeight={500}>
            Give and Take: A Revolutionary Approach to Success
          </Typography>
        </div>

        <div className="contributors_wrapper">
          <Typography component="h3">
            <Link href="#">Adam M. Grant</Link>
          </Typography>
        </div>
        <div className="rating_stats_wrapper">
          <div className="rating_stats_col">
            <Rating className="static_stars" name="read-only" value={3.95} readOnly precision={0.1} size="small" />
            <Typography>3.95</Typography>
          </div>
          <div className="rating_stats_col">
            <Typography>348,897 ratings</Typography>
          </div>
          <div className="rating_stats_col">
            <Typography>8,786 reviews</Typography>
          </div>
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
            <Button variant="outlined" sx={{ width: "160px" }}>
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
                  <Link href="#" fontSize="0.875rem" fontWeight={600}>
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
              <Link href="#" className="external_book_link">
                <Avatar sx={{ bgcolor: "#000" }}>
                  <MenuBookOutlinedIcon />
                </Avatar>
                <Typography color="#333" fontSize="0.875rem">
                  Preview
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#" className="external_book_link">
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
      </div>
    </Box>
  );
}
