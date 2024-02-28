"use client";

import { Avatar, Box, CardHeader, Container, InputAdornment, Link, SxProps, TextField, Typography } from "@mui/material";
import LoginButtonGroup from "../../components/LoginButtonGroup";

import SearchIcon from "@mui/icons-material/Search";
import AppLinks from "../../components/AppLinks";
import HomeImageList from "../../components/HomeImageList";
import HomeTextList from "../../components/HomeTextList";
import Heading from "../../components/Heading";
import NextLink from "next/link";
import useUserSession from "@/hooks/useUserSession";
import { CHALLENGES_PATH } from "@/constants/routes";

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
    width: "100%",
    maxWidth: "100%",
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
  const user = useUserSession();

  const popularBooksForImageList = popularBooksResponse.docs.map((item) => ({
    id: item.doc.isbn13,
    title: item.doc.bookname,
    pageLink: item.doc.bookDtlUrl, // TODO: 주소 수정
    imgSrc: item.doc.bookImageURL,
  }));
  const newSepcialBooksForImageList = newSepcialBooksResponse.item.map((item) => ({
    id: item.itemId.toString(),
    title: item.title,
    pageLink: item.link,
    imgSrc: item.cover,
  }));
  const bloggerBestSellerForImageList = bloggerBestSellerResponse.item.map((item) => ({
    id: item.itemId.toString(),
    title: item.title,
    pageLink: item.link,
    imgSrc: item.cover,
  }));

  return (
    <Box className="Home">
      <Box sx={sxHomepagePromotionWrapper}>
        <NextLink href={CHALLENGES_PATH}>
          <img src="https://th.bing.com/th/id/OIG1.qpF4MPDGP3iNZ.Zz4CZQ?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Homepagemasthead" />
        </NextLink>
      </Box>

      <Container>
        {!user && (
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
        )}

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
          <HomeImageList images={popularBooksForImageList} />
          <Heading heading="주목할 만한 신간" />
          <HomeImageList images={newSepcialBooksForImageList} />
          <Heading heading="블로거 추천 베스트셀러" />
          <HomeImageList images={bloggerBestSellerForImageList} />
        </Box>

        <Box sx={quoteSection}>
          <Heading heading="리스트" />
          <HomeTextList bookTextData={MOCK_BOOK_TEXTS} />
          <Heading heading="장르" />
          <HomeTextList bookTextData={MOCK_BOOK_TEXTS} />
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
          <HomeTextList bookTextData={MOCK_BOOK_TEXTS} />
        </Box>

        <Box sx={sxLastAwardsWrapper}>
          <Heading heading="Goodreads Choice Awards: The Best Books 2023" />
          <Link href="/choiceawards/best-books-2023" component={NextLink}>
            <img
              alt="Goodreads Choice Awards 2023"
              src="https://s.gr-assets.com/assets/award/2023/signed-out-hp/bottom-placement-mobile-acefe21335ac3d79ad255d48b88de499.png"
            />
          </Link>
          <Link href="/choiceawards/best-books-2023" component={NextLink}>
            See the winners
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

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
