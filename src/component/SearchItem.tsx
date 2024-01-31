import NextLink from "next/link";

import { Box, Button, Card, CardContent, CardMedia, IconButton, Link, Rating, SxProps, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const sxSearchItem: SxProps = {
  display: "flex",
  padding: "16px 12px",

  ".book_cover": {
    alignSelf: "start",
  },

  ".MuiCardMedia-root": {
    objectFit: "contain",
    alignSelf: "flex-start",
  },
};

const sxBookInfoColumn: SxProps = {
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

interface Props {}

export default function SearchItem() {
  return (
    <Card sx={sxSearchItem} component="li">
      <NextLink className="book_cover" href="/book/show/16158498-give-and-take?from_search=true&from_srp=true&qid=1FYMujJ2R2&rank=1">
        <CardMedia
          component="img"
          sx={{ width: 75 }}
          image="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1445791874i/25614523._UX75_.jpg"
          alt="Book cover for Originals: How Non-Conformists Move the World"
        />
      </NextLink>

      <Box sx={sxBookInfoColumn}>
        <CardContent className="book_info">
          <Typography className="book_title" component="div">
            Originals: How Non-Conformists Move the World
          </Typography>
          <Typography variant="subtitle1" component="div">
            by Adam M. Grant
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
                Published 2013
              </Typography>
              <Link
                href="https://www.goodreads.com/work/editions/21998914-give-and-take-a-revolutionary-approach-to-success"
                component={NextLink}
              >
                80 Editions
              </Link>
            </div>
          </div>
        </CardContent>
        <Box sx={sxBookUserShelfAction}>
          <div className="wtr_wrapper">
            <Box component="form">
              <Button type="submit" variant="contained" color="secondary" sx={{ width: "120px", borderRadius: "4px 0 0 4px" }}>
                읽고 싶어요
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
