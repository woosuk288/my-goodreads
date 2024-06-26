"use client";

import { useState } from "react";
import WantToReadButton from "./WantToReadButton";
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
  SxProps,
  Typography,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ShareIcon from "@mui/icons-material/Share";

import BookPageHeading from "./BookPageHeading";
import BookRatingStats from "./BookRatingStats";
import ExpandMoreBar from "./ExpandMoreBar";
import { API_PROFILE, API_RATING, REVIEW_EDIT_PATH } from "@/constants/routes";
import { useAuth } from "./AuthProvider";
import useSWR from "swr";
import { getProfile, getReviewByBookAndUser, updateRating } from "@/lib/firebase/firestore";
import { extractISBN, getReadStatus } from "@/lib/utils";
import UserRatingButton from "./UserRatingButton";

interface Props {
  aladinBook: AladinItemBook;
  kakaoBook: IKakaoBook;
  // analysisBook: ILibAnalysisByBookResponse
  keywordList: ILibKeywordListResponse | null;
}

interface IRatingInfo {
  commentReviewCount: number;
  myReviewCount: number;
  ratingCount: number;
  ratingScore: number;
}

export default function BookInfo({ aladinBook, kakaoBook, keywordList }: Props) {
  const { title, thumbnail, authors, contents, isbn } = kakaoBook;
  const bookId = extractISBN(isbn);

  const ratingInfo = aladinBook.subInfo.ratingInfo as IRatingInfo;

  const bookDetailLink = `${REVIEW_EDIT_PATH}/${bookId}`;

  const { state, isLoggedIn, user } = useAuth();
  const { data: userData, isLoading, error } = useSWR(state === "loaded" && isLoggedIn ? API_PROFILE : null, getProfile);

  const uid = user?.uid;
  const { data: reviewData, isLoading: isReviewLoading } = useSWR(isbn && uid ? `${API_RATING}/${bookId}/${uid}` : null, (_) =>
    getReviewByBookAndUser(bookId, uid!)
  );

  const [show, setShow] = useState(false);

  const handleShowMore = () => {
    setShow(!show);
  };

  return (
    <Box sx={sxBookInfo}>
      <div className="book_cover_section">
        <div className="book_cover_wrapper">
          <img className="book_cover_image" src={thumbnail || aladinBook.cover} alt={title + "book_cover"} />
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
            {title}
          </Typography>
        </div>

        <div className="contributors_wrapper">
          <Typography component="h3">
            <Link href="#" component={NextLink}>
              {Array.isArray(authors) ? authors.join(", ") : authors}
            </Link>
          </Typography>
        </div>
        <div className="rating_stats_wrapper">
          <BookRatingStats
            ratingValue={ratingInfo.ratingScore}
            userRatingCount={ratingInfo.ratingCount}
            userReviewCount={ratingInfo.commentReviewCount}
          />
        </div>
        <div className="actions_warpper">
          <div className="wtr_button_wrapper">
            <WantToReadButton kakaoBook={kakaoBook} currentReadStatus={getReadStatus(extractISBN(kakaoBook.isbn), userData)} />
          </div>
          <div className="user_rating_wrapper">
            <UserRatingButton bookId={bookId} />
          </div>
          {reviewData?.reviewText?.trim().length ? (
            <div className="user_review_wrapper">
              <Typography className="user_review_text">{reviewData.reviewText}</Typography>
              <Button
                className="user_review_button"
                variant="outlined"
                href={bookDetailLink}
                component={NextLink}
                disabled={state === "loading"}
              >
                리뷰 수정
              </Button>
            </div>
          ) : (
            <Button variant="outlined" href={bookDetailLink} component={NextLink} disabled={state === "loading"}>
              리뷰 쓰기
            </Button>
          )}
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
              <Link className="external_book_link" rel="noopener noreferrer" href={aladinBook.link} target="_blank">
                <Avatar sx={{ bgcolor: "#000" }}>
                  <StoreIcon />
                  {/* src="/images/ex_aladin_logo_square.png" */}
                </Avatar>
                <Typography color="#333" fontSize="0.875rem">
                  구매하기
                  {/* Other Stores */}
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
            <BookPageHeading title="BOOK DESCRIPTION" />
          </div>

          <Collapse in={show} collapsedSize={160}>
            <div className="description_paragraph">{contents.slice(-1) === "." ? contents : contents + "..."}</div>
          </Collapse>
          <ExpandMoreBar show={show} onShowMore={handleShowMore} />
        </div>
      </div>

      {keywordList?.items && (
        <div className="genres_wrapper">
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            키워드
          </Typography>
          <div className="genres_list">
            {keywordList?.items?.slice(0, 10).map((keyword) => (
              <Chip
                key={keyword.item.word}
                clickable
                label={keyword.item.word}
                sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          장르
        </Typography>
        

        <div className="genres_list">
          <Chip clickable label="자기계발" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
          <Chip clickable label="성공학" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
          <Chip clickable label="인간관계" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
          <Chip clickable label="경제경영" sx={{ fontWeight: 600, color: "secondary.main", bgcolor: "#EEEEEE" }} />
        </div> */}
    </Box>
  );
}

const sxBookInfo: SxProps = {
  padding: "12px",
  ".book_cover_section": {
    position: "relative",
    width: "calc(100% + 24px)",
    left: "-12px",
    top: "-12px",
    padding: "12px",
    backgroundColor: "whitesmoke",
  },
  ".book_cover_wrapper": {
    width: "35%",
    margin: "auto",
    filter: "drop-shadow(0 0.2rem 0.8rem rgba(0, 0, 0, 0.2))",
    textAlign: "center",
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
    ".wtr_button_wrapper": {
      margin: "12px 0",
    },
    ".user_rating_wrapper": {
      margin: "8px 0 12px",
    },
    ".user_review_button": {
      width: "160px",
      marginTop: "16px",
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
