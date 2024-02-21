import NextLink from "next/link";

import { Box, Button, Card, CardContent, CardMedia, IconButton, Link, Rating, SxProps, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { addBookToShelf } from "@/lib/firebase/firestore";
import { useTransition } from "react";
import { extractISBN } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LOGIN_PATH } from "@/constants/routes";

const sxSearchBookItem: SxProps = {
  display: "flex",
  padding: "16px 12px",

  ".book_cover": {
    width: "25%",
    alignSelf: "start",
  },

  ".MuiCardMedia-root": {
    objectFit: "contain",
    alignSelf: "flex-start",
    maxHeight: "180px",
  },
};

const sxBookInfoColumn: SxProps = {
  width: "75%",

  ".book_info": {
    paddingRight: 0,
    paddingTop: 0,
  },
  ".book_title": {
    fontWeight: "bold",
  },

  ".book_meta_info": {
    ".book_rating": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "12px",
    },
    "& *": {
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
};

const sxBookUserShelfAction: SxProps = {
  padding: "0 16px",

  ".wtr_wrapper": {
    display: "flex",
    width: "160px",
  },
  ".purchase_wrapper": {
    width: "160px",
    marginTop: "6px",
  },
};

interface Props {
  kakaoBook: IKakaoBook;
  readStatus: boolean;
  isLoggedIn: boolean;
}

export default function SearchBookItem({ kakaoBook, readStatus, isLoggedIn }: Props) {
  const { thumbnail, title, authors, datetime } = kakaoBook;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBookStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addBookToShelf(extractISBN(kakaoBook.isbn), kakaoBook);
  };

  return (
    <Card sx={sxSearchBookItem} component="li">
      <NextLink className="book_cover" href="/book/show/16158498-give-and-take?from_search=true&from_srp=true&qid=1FYMujJ2R2&rank=1">
        <CardMedia component="img" image={thumbnail} alt={`Book cover for ${title}`} />
      </NextLink>

      <Box sx={sxBookInfoColumn}>
        <CardContent className="book_info">
          <Typography className="book_title" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {authors.join(", ")}
          </Typography>
          <div className="book_meta_info">
            <div className="book_rating">
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
            </div>
            <div className="book_supplemental_info">
              <Typography className="book_publication_date" color="text.secondary" component="span" marginRight="12px">
                Published {new Date(datetime).toLocaleDateString()}
              </Typography>
              {/* <Link
                href="https://www.goodreads.com/work/editions/21998914-give-and-take-a-revolutionary-approach-to-success"
                component={NextLink}
              >
                80 Editions
              </Link> */}
            </div>
          </div>
        </CardContent>
        <Box sx={sxBookUserShelfAction}>
          <div className="wtr_wrapper">
            <Box
              component="form"
              onSubmit={
                isLoggedIn === false
                  ? () => {
                      router.push(LOGIN_PATH);
                    }
                  : (e) =>
                      startTransition(() => {
                        handleBookStatusSubmit(e);
                      })
              }
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ width: "120px", borderRadius: "4px 0 0 4px" }}
                disabled={isPending}
              >
                {isPending && readStatus === false ? "저장중..." : readStatus ? "읽음" : "읽고싶어요"}
                {/* {isPending === false && readStatus && "읽음"}
                {isPending === false && readStatus === false && "읽고 싶어요"} */}
              </Button>
            </Box>
            <IconButton
              sx={{
                width: "40px",
                height: "36.5px",
                boxShadow: 2,
                borderRadius: "0 4px 4px 0",
                color: "primary.light",
                bgcolor: "secondary.main",
                ":hover": { bgcolor: "secondary.main" },
              }}
            >
              <LibraryBooksIcon />
            </IconButton>
          </div>
          <div className="purchase_wrapper">
            <Button
              variant="contained"
              sx={{ width: "160px", bgcolor: "primary.light", color: "#333333", ":hover": { bgcolor: "primary.light" } }}
            >
              구입하기
            </Button>
          </div>
          <form></form>
        </Box>
      </Box>
    </Card>
  );
}
