"use client";

import { Avatar, Box, CardHeader, Container, InputAdornment, Link, Skeleton, SxProps, TextField, Theme, Typography } from "@mui/material";
import LoginButtonGroup from "../../components/LoginButtonGroup";

import HomeImageList from "../../components/HomeImageList";
import HomeTextList from "../../components/HomeTextList";
import Heading from "../../components/Heading";
import NextLink from "next/link";
import { BOOK_PATH, CHALLENGES_PATH } from "@/constants/routes";
import { useAuth } from "@/components/AuthProvider";

const sxHome: SxProps = {};

const sxHomepagePromotionWrapper: SxProps<Theme> = (theme) => ({
  marginLeft: "auto",
  marginRight: "auto",
  padding: { xs: "0 0 24px", md: "24px" },

  img: {
    height: "380px",
    objectFit: "cover",
    borderRadius: "8px",
  },
});

const sxAuthSignInWrapper: SxProps = {
  display: { sm: "none" },
  textAlign: "center",
  margin: "24px 0 24px",
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

  ".row": {
    display: { sm: "flex" },
  },
  ".left_col, .right_col": {
    flex: { sm: 1 },
  },
  ".MuiCardHeader-root": {
    alignItems: "flex-start",
    paddingLeft: 0,
  },
};

const sxLastAwardsWrapper: SxProps = {
  marginBottom: "24px",

  ".MuiLink-root": {
    fontSize: "0.875rem",
    color: "#00635D",
  },
  // img: {
  //   width: "100%",
  //   maxWidth: "100%",
  // },
  ".row_mobile": {
    display: { sm: "none" },
  },
  ".row_desktop": {
    display: { xs: "none", sm: "flex" },
    gap: "6vw",
    alignItems: "center",
  },
  ".left_col": {},
  ".right_col": {
    flex: 1,
  },
};

interface Props {
  popularBooksResponse: IPopularLoanBooksResponse;
  newSepcialBooksResponse: IAladinItemListResponse;
  bloggerBestSellerResponse: IAladinItemListResponse;
  // hotTrendBooksResponse: IHotTrendBooksResponse;
}

export default function HomeMain({
  popularBooksResponse,
  newSepcialBooksResponse,
  bloggerBestSellerResponse,
}: // hotTrendBooksResponse,
Props) {
  const { state, user } = useAuth();

  const popularBooksForImageList = popularBooksResponse.docs.map((item) => ({
    id: item.doc.isbn13,
    title: item.doc.bookname,
    pageLink: `${BOOK_PATH}/${item.doc.isbn13}`,
    imgSrc: item.doc.bookImageURL,
    isbn: item.doc.isbn13,
  }));
  const newSepcialBooksForImageList = newSepcialBooksResponse.item.map((item) => ({
    id: item.itemId.toString(),
    title: item.title,
    pageLink: `${BOOK_PATH}/${item.isbn13}`,
    imgSrc: item.cover,
    isbn: item.isbn13,
  }));
  const bloggerBestSellerForImageList = bloggerBestSellerResponse.item.map((item) => ({
    id: item.itemId.toString(),
    title: item.title,
    pageLink: `${BOOK_PATH}/${item.isbn13}`,
    imgSrc: item.cover,
    isbn: item.isbn13,
  }));

  return (
    <Box className="Home">
      <Box sx={sxHomepagePromotionWrapper}>
        <NextLink href={CHALLENGES_PATH}>
          {/* <img src="/images/home-head-mobile.png" alt="Homepagemasthead" /> */}
          <img src="/images/home-head-desktop.png" alt="Homepagemasthead" />
        </NextLink>
      </Box>

      <Container>
        {state === "loading" ? (
          <>
            <Skeleton variant="text" width={"70%"} sx={{ fontSize: "1.25rem" }} />
            <Skeleton variant="rounded" height={200} />
          </>
        ) : (
          !user && (
            <Box sx={sxAuthSignInWrapper}>
              <Typography component="h2" fontSize="22px" fontWeight="bold" lineHeight={1} sx={{ marginBottom: "10px" }}>
                Meet your next favorite book.
                {/* 다음으로 사랑하게 될 책을 만나보세요 */}
              </Typography>
              <Typography variant="body2" sx={{ margin: "15px 10px 24px" }}>
                Find and read more books you’ll love. Be part of Goodreads, the world’s largest community for readers like you.
                {/* 더 많은 책을 찾아보고, 새로운 이야기에 빠져보세요. 세계 최대 독서 커뮤니티인 Goodreads에서 같은 책을 사랑하는 독자들과 함께하세요. */}
              </Typography>
              <LoginButtonGroup />
            </Box>
          )
        )}

        {/* <Box className="serachBar" sx={{ margin: "10px" }}>
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
        </Box> */}

        <Box>
          <Heading heading="이번 주 가장 많이 읽은 책" />
          <HomeImageList images={popularBooksForImageList} />
          <Heading heading="주목할 만한 신간" />
          <HomeImageList images={newSepcialBooksForImageList} />
          <Heading heading="블로거 추천 베스트셀러" />
          <HomeImageList images={bloggerBestSellerForImageList} />
        </Box>

        <Box>
          {/* <Heading heading="리스트" /> */}
          {/* <HomeTextList textLinks={MOCK_BOOK_TEXTS} /> */}
          <Heading heading="장르" />
          <HomeTextList textLinks={MOCK_GENRES} />
        </Box>
        <Box sx={quoteSection}>
          <Heading heading="명언" />
          <div className="row">
            <div className="left_col">
              <CardHeader
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
            </div>
            <div className="right_col">
              <HomeTextList textLinks={MOCK_QUOTES} />
            </div>
          </div>
        </Box>

        <Box sx={sxLastAwardsWrapper}>
          <Heading heading="Goodreads Choice Awards: The Best Books 2023" />
          <div className="row_mobile">
            <div className="image_wrapper">
              <Link href="/choiceawards/best-books-2023" component={NextLink}>
                <img
                  alt="Goodreads Choice Awards 2023"
                  src="https://s.gr-assets.com/assets/award/2023/signed-out-hp/bottom-placement-mobile-acefe21335ac3d79ad255d48b88de499.png"
                />
              </Link>
              <Link href="/choiceawards/best-books-2023" component={NextLink}>
                See the winners
              </Link>
            </div>
          </div>
          <div className="row_desktop">
            <div className="left_col">
              <Link>
                <img src="/images/choice-logo-mediumpng.png" alt="Goodreads Choice Awards 2023" />
              </Link>
            </div>
            <div className="right_col">
              <HomeTextList textLinks={MOCK_CHOICE_AWARDS} />
            </div>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

const MOCK_GENRES = [
  {
    pageLink: "/genres/biography",
    text: "Biography",
  },
  {
    pageLink: "/genres/business",
    text: "Business",
    breakpoints: ["sm"],
  },
  {
    pageLink: "/genres/children-s",
    text: "Children's",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/christian",
    text: "Christian",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/classics",
    text: "Classics",
    breakpoints: ["sm"],
  },
  {
    pageLink: "/genres/comics",
    text: "Comics",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/cookbooks",
    text: "Cookbooks",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/ebooks",
    text: "Ebooks",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/fantasy",
    text: "Fantasy",
    breakpoints: ["sm"],
  },
  {
    pageLink: "/genres/fiction",
    text: "Fiction",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/graphic-novels",
    text: "Graphic Novels",
  },
  {
    pageLink: "/genres/historical-fiction",
    text: "Historical Fiction",
  },
  {
    pageLink: "/genres/history",
    text: "History",
    breakpoints: ["sm"],
  },
  {
    pageLink: "/genres/horror",
    text: "Horror",
  },
  {
    pageLink: "/genres/memoir",
    text: "Memoir",
    breakpoints: ["xs"],
  },
  {
    pageLink: "/genres/music",
    text: "Music",
  },
  {
    pageLink: "/genres/mystery",
    text: "Mystery",
  },
  {
    pageLink: "/genres/non-fiction",
    text: "Nonfiction",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres/poetry",
    text: "Poetry",
  },
  {
    pageLink: "/genres/psychology",
    text: "Psychology",
  },
  {
    pageLink: "/genres/romance",
    text: "Romance",
    breakpoints: ["sm"],
  },
  {
    pageLink: "/genres/science",
    text: "Science",
  },
  {
    pageLink: "/genres/science-fiction",
    text: "Science Fiction",
    breakpoints: ["sm"],
  },
  {
    pageLink: "/genres/self-help",
    text: "Self Help",
  },
  {
    pageLink: "/genres/sports",
    text: "Sports",
  },
  {
    pageLink: "/genres/thriller",
    text: "Thriller",
  },
  {
    pageLink: "/genres/travel",
    text: "Travel",
  },
  {
    pageLink: "/genres/young-adult",
    text: "Young Adult",
    breakpoints: ["xs", "sm"],
  },
  {
    pageLink: "/genres",
    text: "More genres",
    breakpoints: ["xs", "sm"],
  },
];

const MOCK_QUOTES = [
  {
    pageLink: "/quotes",
    text: "Best quotess",
  },
  {
    pageLink: "/quotes/tag/love",
    text: "Love quotes",
  },
  {
    pageLink: "/quotes/tag/inspirational",
    text: "Inspirational quotes",
  },
  {
    pageLink: "/quotes/tag/funny",
    text: "Funny quotes",
  },
  {
    pageLink: "/quotes/tag/motivational",
    text: "Motivational quotes",
  },
  {
    pageLink: "/quotes/tag/life",
    text: "Life quotes",
  },
  {
    pageLink: "/quotes/tag/friends",
    text: "Friends quotes",
  },
  {
    pageLink: "/quotes/tag/positive",
    text: "Positive quotes",
  },
  {
    pageLink: "/quotes/tag/birthday",
    text: "Birthday quotes",
  },
  {
    pageLink: "/quotes",
    text: "See more quotes",
  },
];

const MOCK_CHOICE_AWARDS = [
  {
    pageLink: "/choiceawards/best-fiction-books-2023",
    text: "Best Fiction",
  },
  {
    pageLink: "/choiceawards/best-historical-fiction-books-2023",
    text: "Best Historical Fiction",
  },
  {
    pageLink: "/choiceawards/best-mystery-thriller-books-2023",
    text: "Best Mystery & Thriller",
  },
  {
    pageLink: "/choiceawards/best-romance-books-2023",
    text: "Best Romance",
  },
  {
    pageLink: "/choiceawards/best-romantasy-books-2023",
    text: "Best Romantasy",
  },
  {
    pageLink: "/choiceawards/best-fantasy-books-2023",
    text: "Best Fantasy",
  },
  {
    pageLink: "/choiceawards/best-science-fiction-books-2023",
    text: "Best Science Fiction",
  },
  {
    pageLink: "/choiceawards/best-horror-books-2023",
    text: "Best Horror",
  },
  {
    pageLink: "/choiceawards/best-young-adult-fantasy-books-2023",
    text: "Best Young Adult Fantasy & Science Fiction",
  },
  {
    pageLink: "/choiceawards/best-young-adult-fiction-books-2023",
    text: "Best Young Adult Fiction",
  },
  {
    pageLink: "/choiceawards/best-debut-novel-2023",
    text: "Best Debut Novel",
  },
  {
    pageLink: "/choiceawards/best-nonfiction-books-2023",
    text: "Best Nonfiction",
  },
  {
    pageLink: "/choiceawards/best-memoir-autobiography-books-2023",
    text: "Best Memoir & Autobiography",
  },
  {
    pageLink: "/choiceawards/best-history-biography-books-2023",
    text: "Best History & Biography",
  },
  {
    pageLink: "/choiceawards/best-humor-books-2023",
    text: "Best Humor",
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
