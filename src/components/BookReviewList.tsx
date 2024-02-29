"use client";

import { Box, Button, Divider, LinearProgress, Rating, SxProps, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import BookPageHeading02 from "./BookPageHeading02";
import BookRatingStats from "./BookRatingStats";
import BookReviewItem from "./BookReviewItem";

const sxBookReviewList: SxProps = {
  padding: "0 12px",

  ".rating_stats_heading_wrapper": {
    margin: "32px 0 12px",
  },
  ".rating_stats_wrapper": {
    padding: "8px",
  },
  ".rating_details_wrapper": {
    margin: "0 12px",
  },

  ".review_section_heading_wrapper": {
    margin: "40px 0 32px",
  },
  ".user_review_list_wrapper": {
    margin: "0 -12px",
  },
  ".shadow_bottom_cover": {
    borderTop: "1px solid #FFFFFF",
  },
  ".review_more_button_wrapper": {
    margin: "24px 0 64px",
    textAlign: "center",
  },

  ".book_review_item": {
    marginTop: "1px",
    ":last-of-type": {
      boxShadow: "0 1px 3px 0 white",
    },
  },
};

export default function BookReviewList() {
  return (
    <Box sx={sxBookReviewList}>
      <div className="rating_details_section">
        <div className="rating_stats_heading_wrapper">
          <BookPageHeading02 title="RATING DETAILS" />
        </div>
        <div className="rating_stats_wrapper">
          <BookRatingStats ratingValue={3.95} userRatingCount={348897} />
        </div>
        <div className="rating_details_wrapper">
          <ReviewRatingDetailRow value={5} targetUserRatingCount={96} allUserRatingCount={200} />
          <ReviewRatingDetailRow value={4} targetUserRatingCount={60} allUserRatingCount={200} />
          <ReviewRatingDetailRow value={3} targetUserRatingCount={28} allUserRatingCount={200} />
          <ReviewRatingDetailRow value={2} targetUserRatingCount={6} allUserRatingCount={200} />
          <ReviewRatingDetailRow value={1} targetUserRatingCount={6} allUserRatingCount={200} />
        </div>
      </div>

      <div className="review_section">
        <div className="review_section_heading_wrapper">
          <BookPageHeading02 title="COMMUNITY REVIEWS" />
        </div>
        <div className="user_review_list_wrapper">
          <BookReviewItem />
          <BookReviewItem />
          <BookReviewItem />
          <div className="shadow_bottom_cover"></div>
        </div>
        <div className="review_more_button_wrapper">
          <Divider>
            <Button variant="outlined" href="/book/show" endIcon={<NavigateNextIcon />}>
              More community reviews
            </Button>
          </Divider>
        </div>
      </div>
    </Box>
  );
}

interface IRatingDetailRow {
  value: number;
  maxValue?: number;
  targetUserRatingCount: number;
  allUserRatingCount: number;
}
function ReviewRatingDetailRow({ value, maxValue = 5, targetUserRatingCount, allUserRatingCount }: IRatingDetailRow) {
  const maxBarWidth = 300; // 최대 막대 너비 조절

  const targetPercentInt = Math.round((targetUserRatingCount / allUserRatingCount) * 100);

  return (
    <div key={/* item.category */ "4of5"} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
      <Rating size="small" value={value} readOnly />
      <LinearProgress
        variant="determinate"
        color="warning"
        value={targetPercentInt}
        sx={{ flex: 1, height: "12px", borderRadius: "4px" }}
      />

      <Typography variant="body2" fontWeight={500} width="32px">
        {Number(targetPercentInt)}%
      </Typography>
    </div>
  );
}
