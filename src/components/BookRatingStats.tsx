import { Box, Rating, SxProps, Typography } from "@mui/material";

const sxBookRatingStats: SxProps = {
  display: "flex",
  // alignItems: "center",
  justifyContent: "center",

  ".rating_stats_col": {
    ".static_stars": {
      marginRight: "4px",
    },
    ".static_stars_value": {
      fontWeight: 600,
    },
    display: "flex",
    alignItems: "center",
    ":not(:first-of-type)": {
      ":before": { padding: "4px", content: '"\\B7"' },
    },
  },
};

interface IBookRatingStats {
  ratingValue: number;
  userRatingCount: number;
  userReviewCount?: number;
  fontSize?: string;
  hasText?: boolean;
}

export default function BookRatingStats({ ratingValue, userRatingCount, userReviewCount, fontSize, hasText = true }: IBookRatingStats) {
  return (
    <Box sx={sxBookRatingStats} className="book_rating_Stats">
      {ratingValue && (
        <div className="rating_stats_col">
          <Rating className="static_stars" name="read-only" value={1} max={1} readOnly size="small" />
          <Typography className="static_stars_value">{ratingValue}</Typography>
        </div>
      )}
      {userRatingCount && (
        <div className="rating_stats_col">
          <Typography fontSize={fontSize}>
            {userRatingCount.toLocaleString()} {hasText && "ratings"}
          </Typography>
        </div>
      )}
      {userReviewCount && (
        <div className="rating_stats_col">
          <Typography>
            {userReviewCount.toLocaleString()} {hasText && "reviews"}
          </Typography>
        </div>
      )}
    </Box>
  );
}
