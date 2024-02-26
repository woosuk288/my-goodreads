import NextLink from "next/link";

import { Box, Button, Card, CardContent, CardMedia, IconButton, Link, Rating, SxProps, Typography } from "@mui/material";
import WantToReadBottomDrawer from "./WantToReadBottomDrawer";
import { READ_STATUS } from "@/constants/values";
import { AuthState } from "@/types/exportType";
import { BOOK_PATH } from "@/constants/routes";

interface Props {
  kakaoBook: IKakaoBook;
  readStatus: IBookReadStatus;
  authState: AuthState;
}

export default function SearchBookItem({ kakaoBook, readStatus, authState }: Props) {
  const { thumbnail, title, authors, datetime } = kakaoBook;

  const params = new URLSearchParams(kakaoBook as unknown as Record<string, string>);
  const bookDetailLink = `${BOOK_PATH}?${params.toString()}`;

  return (
    <Card sx={sxSearchBookItem} component="li">
      <NextLink className="book_cover" href={bookDetailLink}>
        <CardMedia component="img" image={thumbnail} alt={`Book cover for ${title}`} />
      </NextLink>

      <Box sx={sxBookInfoColumn}>
        <CardContent className="book_info">
          <Typography className="book_title" component={NextLink} href={bookDetailLink}>
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
            <WantToReadBottomDrawer kakaoBook={kakaoBook} readStatus={readStatus} authState={authState} />
          </div>
          {/* <div className="purchase_wrapper">
            <Button
              variant="contained"
              sx={{ width: "160px", bgcolor: "primary.light", color: "#333333", ":hover": { bgcolor: "primary.light" } }}
            >
              구입하기
            </Button>
          </div> */}
          <form></form>
        </Box>
      </Box>
    </Card>
  );
}

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
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "inherit",
    textDecoration: "none",
    ":hover, :focus": {
      textDecoration: "underline",
    },
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
