import { Avatar, Box, CardHeader, Container, InputAdornment, SxProps, TextField, Typography } from "@mui/material";
import SocialLoginButtonGroup from "./SocialLoginButtonGroup";

import SearchIcon from "@mui/icons-material/Search";
import AppLinks from "./AppLinks";
import BookImageList from "./BookImageList";
import BookTextList from "./BookTextList";
import Heading from "./Heading";
import Link from "../Link";

const sxHome: SxProps = {};

const sxHomepagePromotionWrapper: SxProps = {
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "24px",
  padding: "0 0 24px",

  img: { width: "100%" },
};

const sxAuthSignInWrapper: SxProps = {
  textAlign: "center",
  margin: "24px 0 24px",
};

const sxAppLinksWrapper: SxProps = {
  ".app_links": {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    margin: "24px 0",
  },
};

const quoteSection: SxProps = {
  blockquote: {
    position: "relative",

    ":before": {
      position: "absolute",
      top: "-4px",
      left: "-10px",
      content: '"“"',
      fontSize: "3em",
      lineHeight: "0",
      paddingRight: "10px",
      verticalAlign: "-20px",
    },
  },
};

const sxLastAwardsWrapper: SxProps = {
  marginBottom: "24px",

  ".MuiLink-root": {
    fontSize: "0.875rem",
    color: "#00635D",
  },
  img: {
    maxWidth: "100%",
  },
};

export default function Home() {
  return (
    <Box className="Home">
      <Box sx={sxHomepagePromotionWrapper}>
        <a href="https://www.goodreads.com/challenges/11634?ref=rc_jan_24_soh">
          <img
            srcSet="https://www.goodreads.com/assets/home/homepage_promos/reading_challenge_2024/HomepageMasthead_Mobile@2x.png 2x"
            src="https://s.gr-assets.com/images/home/homepage_promos/reading_challenge_2024/HomepageMasthead_Mobile.png"
            alt="Homepagemasthead mobile"
          />
        </a>
      </Box>

      <Container>
        <Box sx={sxAuthSignInWrapper}>
          <Typography component="h2" fontSize="22px" fontWeight="bold" lineHeight={1} sx={{ marginBottom: "10px" }}>
            Meet your next favorite book.
          </Typography>
          <Typography variant="body2" sx={{ margin: "15px 10px 24px" }}>
            Find and read more books you’ll love. Be part of Goodreads, the world’s largest community for readers like you.
          </Typography>
          <SocialLoginButtonGroup />
        </Box>

        <Box className="serachBar" sx={{ margin: "10px" }}>
          <TextField
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "1.8rem" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search books and authors"
            aria-label="Search books and authors"
            type="text"
            name="search[query]"
            id="search_query"
          ></TextField>
        </Box>

        <Box sx={sxAppLinksWrapper}>
          <AppLinks />
        </Box>

        <Box>
          <Heading heading="이번 주 가장 많이 읽은 책" />
          <BookImageList images={MOCK_BOOK_IMAGES} />
          <Heading heading="이번 달 새로 나온 책" />
          <BookImageList images={MOCK_BOOK_IMAGES} />
          <Heading heading="20세기 최고의 책" />
          <BookImageList images={MOCK_BOOK_IMAGES} />
        </Box>

        <Box sx={quoteSection}>
          <Heading heading="리스트" />
          <BookTextList bookTextData={MOCK_BOOK_TEXTS} />
          <Heading heading="장르" />
          <BookTextList bookTextData={MOCK_BOOK_TEXTS} />
          <Heading heading="명언" />
          <CardHeader
            sx={{ alignItems: "flex-start" }}
            avatar={
              <Avatar
                variant="rounded"
                src="https://i.namu.wiki/i/KmQOLESiwHh0axhm-2Cz2YMKqoapHXLtBUPfPci64sJYHRB4NMy8Hh07mNMfV13WqiNhaPyk7e4e_nNslW1Qef6OiYh8nykq8OuxkX4yhI9eJw4OQxwzDNfFn-jyiS6hpwmPX-lmnyxSTnKV33mHBQ.webp"
                component={Link}
                href="/author/show/3565.Oscar_Wilde"
                aria-label="Oscar Wilde"
              ></Avatar>
            }
            title={
              <Typography component="blockquote" variant="subtitle2" gutterBottom lineHeight={1.2}>
                Always forgive your enemies; nothing annoys them so much.
              </Typography>
            }
            subheader={<Typography variant="body2">Oscar Wilde</Typography>}
          />
          <BookTextList bookTextData={MOCK_BOOK_TEXTS} />
        </Box>

        <Box sx={sxLastAwardsWrapper}>
          <Heading heading="Goodreads Choice Awards: The Best Books 2023" />
          <Link href="/choiceawards/best-books-2023">
            <img
              alt="Goodreads Choice Awards 2023"
              src="https://s.gr-assets.com/assets/award/2023/signed-out-hp/bottom-placement-mobile-acefe21335ac3d79ad255d48b88de499.png"
            />
          </Link>
          <Link href="/choiceawards/best-books-2023">See the winners</Link>
        </Box>
      </Container>
    </Box>
  );
}

const MOCK_BOOK_IMAGES = [
  {
    id: "001",
    title: "Divine Rivals (Letters of Enchantment, #1)",
    pageLink: "/book/show/60784546-divine-rivals",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655928079i/60784546._UX187_.jpg",
  },
  {
    id: "002",
    title: "Crown of Midnight (Throne of Glass, #2)",
    pageLink: "/book/show/76705490-crown-of-midnight",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1673566594i/76705490._UX187_.jpg",
  },
  {
    id: "003",
    title: "It Ends with Us (It Ends with Us, #1)",
    pageLink: "/book/show/27362503-it-ends-with-us",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1688011813i/27362503._UX187_.jpg",
  },
  {
    id: "004",
    title: "The Heaven &amp; Earth Grocery Store",
    pageLink: "/book/show/65678550-the-heaven-earth-grocery-store",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1685350945i/65678550._UX187_.jpg",
  },
  {
    id: "005",
    title: "Hello Beautiful",
    pageLink: "/book/show/61771675-hello-beautiful",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1687803098i/61771675._UX187_.jpg",
  },
  {
    id: "006",
    title: "Same Time Next Year",
    pageLink: "/book/show/199334767-same-time-next-year",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1696902360i/199334767._UX187_.jpg",
  },
  {
    id: "007",
    title: "The Housemaid's Secret (The Housemaid, #2)",
    pageLink: "/book/show/62848145-the-housemaid-s-secret",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1664729357i/62848145._UX187_.jpg",
  },
  {
    id: "008",
    title: "Iron Flame (The Empyrean, #2)",
    pageLink: "/book/show/90202302-iron-flame",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1687463048i/90202302._UX187_.jpg",
  },
  {
    id: "009",
    title: "A Court of Frost and Starlight (A Court of Thorns and Roses, #3.5)",
    pageLink: "/book/show/50659471-a-court-of-frost-and-starlight",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1585622963i/50659471._UX187_.jpg",
  },
  {
    id: "010",
    title: "Things We Left Behind (Knockemout, #3)",
    pageLink: "/book/show/116536542-things-we-left-behind",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1677175478i/116536542._UX187_.jpg",
  },
];

const MOCK_BOOK_TEXTS = [
  {
    pageLink: "/list/tag/fiction",
    text: "Fiction book lists",
  },
  {
    pageLink: "/list/show/130.Best_Audiobooks_Ever",
    text: "Best audiobooks ever",
  },
  {
    pageLink: "/list/show/86.Best_Children_s_Books",
    text: "Best children’s books",
  },
  {
    pageLink: "/list/show/2681.Time_Magazine_s_All_Time_100_Novels",
    text: "Best novels of all time",
  },
  {
    pageLink: "/list/tag/romance",
    text: "Romance book lists",
  },
  {
    pageLink: "/list",
    text: "See more lists",
  },
];
