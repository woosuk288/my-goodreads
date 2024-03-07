"use client";

import { addReviewToBook, getReviewByBookAndUser, updateRating } from "@/lib/firebase/firestore";
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
  Typography,
} from "@mui/material";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import useSWR from "swr";
import { useAuth } from "./AuthProvider";
import LoadingProgress from "./LoadingProgress";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { API_RATING, BOOK_PATH } from "@/constants/routes";
import UserRatingButton from "./UserRatingButton";

// TODO: form의 기준
interface Props {
  kakaoBook: IKakaoBook;
}

export default function Editor({ kakaoBook }: Props) {
  const router = useRouter();
  const authState = useAuth();
  const { title, isbn, authors, thumbnail } = kakaoBook;
  const [formReview, setFormReview] = useState({ reviewText: "", isSpoiler: false });

  // const isbn = kakaoBook.isbn ?? "";
  const bookId = extractISBN(isbn);
  const uid = authState.user?.uid;

  const { data: reviewData, isLoading } = useSWR(
    isbn && uid ? `${API_RATING}/${bookId}/${uid}` : null,
    (_) => getReviewByBookAndUser(bookId, uid!),
    {
      onSuccess(data) {
        if (data) {
          setFormReview({ reviewText: data.reviewText ?? "", isSpoiler: data.isSpoiler ?? false });
        }
      },
    }
  );

  const { trigger: updateRatingTrigger, isMutating } = useSWRMutation(
    `${API_RATING}/${bookId}/${uid}`,
    (key: any, { arg }: { arg: { bookId: string; rating: number | null } }) => updateRating(arg.bookId, arg.rating)
  );
  const { trigger: updateReviewTrigger, isMutating: isReviewMutating } = useSWRMutation(
    `${API_RATING}/${bookId}/${uid}`,
    (key: any, { arg }: { arg: { bookId: string; reviewText: string; isSpoiler?: boolean } }) =>
      addReviewToBook(arg.bookId, arg.reviewText, arg.isSpoiler)
  );

  const handleRatingChange = (_: any, newValue: number | null) => {
    updateRatingTrigger({ bookId, rating: newValue });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormReview({
      ...formReview,
      [e.target.name]: e.target.name === "isSpoiler" ? e.target.checked : e.target.value,
    });
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();

    updateReviewTrigger(
      { bookId, ...formReview },
      {
        onSuccess() {
          const bookDetailLink = `${BOOK_PATH}/${bookId}`;
          router.replace(bookDetailLink);
        },
      }
    );
  };

  if (authState.state === "loading" || isLoading) {
    return <LoadingProgress />;
  }

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
      <div className="user_rating_wrapper">
        <UserRatingButton bookId={bookId} />
      </div>

      {/* write a review */}
      <div className="form_text">
        <form onSubmit={handleReviewSubmit}>
          <TextField
            id="outlined-multiline-static"
            name="reviewText"
            // label="Multiline"
            multiline
            rows={7}
            fullWidth
            placeholder="리뷰를 써보세요 (선택)"
            value={formReview.reviewText ?? ""}
            onChange={handleFormChange}
          />

          {/* spoilers checkbox */}
          <div className="spoiler_wrapper">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={formReview.isSpoiler} onChange={handleFormChange} name="isSpoiler" color="info" />}
                label={<Typography variant="subtitle2">스포일러?</Typography>}
              />
            </FormGroup>
            <Typography variant="body2" color="text.secondary">
              1분전에 마지막으로 수정
            </Typography>
          </div>

          <Button color="secondary" variant="contained" type="submit">
            게시하기
          </Button>
        </form>
      </div>
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

  ".user_rating_wrapper": {
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
