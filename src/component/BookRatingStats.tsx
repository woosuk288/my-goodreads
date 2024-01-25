import { Box, Rating, SxProps, Typography } from "@mui/material";

const sxBookRatingStats: SxProps = {
  display: "flex",
  // alignItems: "center",
  justifyContent: "center",

  ".rating_stats_col": {
    ".static_stars": {
      marginRight: "4px",
    },
    display: "flex",
    alignItems: "center",
    ":not(:first-child)": {
      ":before": { padding: "4px", content: '"\\B7"' },
    },
  },
};

interface IBookRatingStats {
  ratingValue: number;
  userRatingCount: number;
  userReviewCount?: number;
}

export default function BookRatingStats({ ratingValue, userRatingCount, userReviewCount }: IBookRatingStats) {
  return (
    <Box sx={sxBookRatingStats}>
      {ratingValue && (
        <div className="rating_stats_col">
          <Rating className="static_stars" name="read-only" value={1} max={1} readOnly precision={0.1} size="small" />
          <Typography>{ratingValue}</Typography>
        </div>
      )}
      {userRatingCount && (
        <div className="rating_stats_col">
          <Typography>{userRatingCount.toLocaleString()} ratings</Typography>
        </div>
      )}
      {userReviewCount && (
        <div className="rating_stats_col">
          <Typography>{userReviewCount.toLocaleString()} reviews</Typography>
        </div>
      )}
    </Box>
  );
}
