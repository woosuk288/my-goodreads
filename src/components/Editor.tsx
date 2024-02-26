"use client";

import { getReviewByBookAndUser, updateRating } from "@/lib/firebase/firestore";
import { extractISBN } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";

import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "./AuthProvider";
import LoadingProgress from "./LoadingProgress";
import useSWRMutation from "swr/mutation";

// TODO: form의 기준
interface Props {
  kakaoBook: IKakaoBook;
}

export default function Editor({ kakaoBook }: Props) {
  const authState = useAuth();
  const { title, isbn, authors, thumbnail } = kakaoBook;
  // const isbn = kakaoBook.isbn ?? "";
  const bookId = extractISBN(isbn);
  const uid = authState.user?.uid;
  const { data: reviewData, isLoading } = useSWR(isbn && uid ? `api/reviews/${bookId}/${uid}` : null, (_) =>
    getReviewByBookAndUser(bookId, uid!)
  );

  const { trigger: updateRatingTrigger, isMutating } = useSWRMutation(
    `api/reviews/${bookId}/${uid}`,
    (key: any, { arg }: { arg: { bookId: string; rating: number | null } }) => updateRating(arg.bookId, arg.rating)
  );

  const [rating, setRating] = useState<number | null>(0);

  const handleRatingChange = (_: any, newValue: number | null) => {
    console.log("newValue : ", newValue);
    setRating(newValue);

    updateRatingTrigger({ bookId, rating: newValue });
  };

  if (authState.state === "loading" || isLoading) {
    return <LoadingProgress />;
  }

  console.log("reviewData : ", reviewData);

  return (
    <Box sx={sxEditor}>
      <Card>
        <CardMedia component="img" sx={{ width: 75 }} image={thumbnail} alt={`Book cover for ${title}`} />

        <Box component="form">
          <CardContent className="book_info">
            <Typography className="book_title" component="h2">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Array.isArray(authors) ? authors.join(", ") : authors}
            </Typography>
            <div className="book_meta_info">
              <Rating className="static_stars" name="read-only" value={3.95} readOnly precision={0.1} size="small" />
              <Typography variant="body2" color="text.secondary">
                3.95
              </Typography>
              <Typography className="book_rating_count" variant="body2" color="text.secondary">
                52,241 평가
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <meta content="3430" itemProp="reviewCount" />
                3,430 리뷰
              </Typography>
              {/* <span className="bookMetaInfo__reviewCount">
              </span> */}
            </div>
          </CardContent>
        </Box>
      </Card>

      {/* rate */}
      {/* 당신의 평점 (1~5단계 watcha) */}
      <div className="user_rating">
        <Typography component="legend">평가하기</Typography>
        <Rating
          className="user_rating_stars"
          name="user-rating"
          size="large"
          precision={0.5}
          value={rating}
          onChange={handleRatingChange}
          disabled={isMutating}
        />
      </div>

      {/* write a review */}
      <TextField
        id="outlined-multiline-static"
        // label="Multiline"
        multiline
        rows={7}
        fullWidth
        placeholder="리뷰를 써보세요 (선택)"
      />

      {/* spoilers checkbox */}
      <div className="spoiler_wrapper">
        <FormGroup>
          <FormControlLabel control={<Checkbox color="info" />} label={<Typography variant="subtitle2">스포일러?</Typography>} />
        </FormGroup>
        <Typography variant="body2" color="text.secondary">
          1분전에 마지막으로 수정
        </Typography>
      </div>

      <Button color="secondary" variant="contained">
        게시하기
      </Button>
    </Box>
  );
}

const sxEditor: SxProps = {
  padding: "12px",

  ".MuiCardMedia-root": {
    objectFit: "contain",
    alignSelf: "flex-start",
  },

  ".MuiCard-root": {
    display: "flex",
    boxShadow: "none",
  },
  ".book_info": {
    paddingRight: 0,
    paddingTop: 0,
  },
  ".book_title": {
    fontSize: "1.125rem",
    fontWeight: "bold",
  },

  ".book_meta_info": {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      fontSize: "0.75rem",
    },
  },
  ".static_stars": {
    marginRight: "2px",
  },
  ".book_rating_count": {
    ":before, :after": {
      content: "'\\00b7'",
      fontWeight: "bold",
      marginLeft: "4px",
      marginRight: "4px",
    },
  },

  ".user_rating": {
    textAlign: "center",
    margin: "20px 0",
  },
  ".user_rating_stars": {
    fontSize: "3rem",
  },

  ".spoiler_wrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "8px 0",
  },
};
