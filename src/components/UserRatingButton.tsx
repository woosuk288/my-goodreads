import { API_RATING } from "@/constants/routes";
import { getReviewByBookAndUser, updateRating } from "@/lib/firebase/firestore";
import { Box, Rating, SxProps, Typography } from "@mui/material";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useAuth } from "./AuthProvider";

interface Props {
  bookId: string;
  // ratingValue: number | null;
  // onRatingChange: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
  // disabled: boolean;
}

function UserRatingButton({ bookId /* ratingValue = null, onRatingChange, disabled = false */ }: Props) {
  const { state, user } = useAuth();
  const { data: reviewData, isLoading: isReviewLoading } = useSWR(bookId && user ? `${API_RATING}/${bookId}/${user.uid}` : null, (_) =>
    getReviewByBookAndUser(bookId, user!.uid)
  );

  const { trigger: updateRatingTrigger, isMutating } = useSWRMutation(
    `${API_RATING}/${bookId}/${user?.uid}`,
    (key: any, { arg }: { arg: { rating: number | null } }) => updateRating(bookId, arg.rating)
  );

  const handleRatingChange = (_: any, newValue: number | null) => {
    updateRatingTrigger({ rating: newValue });
  };

  return (
    <Box sx={sxUserRatingButton}>
      <Typography component="legend" variant="subtitle2" align="center">
        {reviewData?.rating ? "내 평점" : "평가하기"}
      </Typography>
      <div className="user_rating_stars_wrapper">
        <Rating
          className="user_rating_stars"
          name="user-rating"
          size="large"
          precision={0.5}
          value={reviewData?.rating ?? null}
          onChange={handleRatingChange}
          disabled={state === "loading" || isReviewLoading || isMutating}
          // disabled={disabled}
        />
      </div>
    </Box>
  );
}
export default UserRatingButton;

const sxUserRatingButton: SxProps = {
  display: "inline-flex",
  flexDirection: "column",
};
