import { Box, Container, InputAdornment, SxProps, TextField, Typography } from "@mui/material"
import LoginForm from "./LoginForm"

import SearchIcon from '@mui/icons-material/Search';
import AppLinks from "./AppLinks";
import BookImageList from "./BookImageList";
import BookTextList from "./BookTextList";
import Heading from "./Heading";

const sxHome: SxProps = {

}

const sxHomepagePromotionWrapper: SxProps = {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '24px',
  padding: '0 0 24px',

  "img": { width: '100%' }
}

const sxAuthSignInWrapper: SxProps = {
  textAlign: 'center',
  margin: '24px 0 24px'
}


export default function Home() {
  return (
    <Box className="Home">
      <Box sx={sxHomepagePromotionWrapper}>
        <a href="https://www.goodreads.com/challenges/11634?ref=rc_jan_24_soh">
          <img srcSet="https://www.goodreads.com/assets/home/homepage_promos/reading_challenge_2024/HomepageMasthead_Mobile@2x.png 2x" src="https://s.gr-assets.com/images/home/homepage_promos/reading_challenge_2024/HomepageMasthead_Mobile.png" alt="Homepagemasthead mobile" />
        </a>
      </Box>

      <Container>
        <Box sx={sxAuthSignInWrapper}>
          <Typography component="h2" fontSize="22px" fontWeight='bold' lineHeight={1} sx={{ marginBottom: '10px' }}>Meet your next favorite book.</Typography>
          <Typography variant="body2" sx={{ margin: '15px 10px 24px' }}>
            Find and read more books you’ll love. Be part of Goodreads,
            the world’s largest community for readers like you.
          </Typography>
          <LoginForm />
        </Box>

        <Box className="serachBar" sx={{ margin: '10px' }}>
          <TextField fullWidth size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '1.8rem' }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search books and authors" aria-label="Search books and authors" type="text" name="search[query]" id="search_query">
          </TextField>
        </Box>

        <Box sx={{ margin: '24px 0', textAlign: 'center' }}>
          <AppLinks />
        </Box>

        <Box className="bookImageList_wrapper">
          <Heading heading="이번 주 가장 많이 읽은 책" />
          <BookImageList images={MOCK_BOOK_IMAGES} />
          <Heading heading="이번 달 새로 나온 책" />
          <BookImageList images={MOCK_BOOK_IMAGES} />
          <Heading heading="20세기 최고의 책" />
          <BookImageList images={MOCK_BOOK_IMAGES} />
        </Box>

        <Box className="bookTextList">
          <Heading heading="리스트" />
          <BookTextList />

          quote
        </Box>

        <Box className="last_awards_wrapper">last_awards_wrapper</Box>

      </Container>

    </Box>
  )
}


const MOCK_BOOK_IMAGES = [
  {
    id: '001',
    title: "Divine Rivals (Letters of Enchantment, #1)",
    pageLink: "/book/show/60784546-divine-rivals",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655928079i/60784546._UX187_.jpg",
  },
  {
    id: '002',
    title: "Crown of Midnight (Throne of Glass, #2)",
    pageLink: "/book/show/76705490-crown-of-midnight",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1673566594i/76705490._UX187_.jpg",
  },
  {
    id: '003',
    title: "It Ends with Us (It Ends with Us, #1)",
    pageLink: "/book/show/27362503-it-ends-with-us",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1688011813i/27362503._UX187_.jpg",
  },
  {
    id: '004',
    title: "The Heaven &amp; Earth Grocery Store",
    pageLink: "/book/show/65678550-the-heaven-earth-grocery-store",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1685350945i/65678550._UX187_.jpg",
  },
  {
    id: '005',
    title: "Hello Beautiful",
    pageLink: "/book/show/61771675-hello-beautiful",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1687803098i/61771675._UX187_.jpg",
  },
  {
    id: '006',
    title: "Same Time Next Year",
    pageLink: "/book/show/199334767-same-time-next-year",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1696902360i/199334767._UX187_.jpg",
  },
  {
    id: '007',
    title: "The Housemaid's Secret (The Housemaid, #2)",
    pageLink: "/book/show/62848145-the-housemaid-s-secret",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1664729357i/62848145._UX187_.jpg",
  },
  {
    id: '008',
    title: "Iron Flame (The Empyrean, #2)",
    pageLink: "/book/show/90202302-iron-flame",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1687463048i/90202302._UX187_.jpg",
  },
  {
    id: '009',
    title: "A Court of Frost and Starlight (A Court of Thorns and Roses, #3.5)",
    pageLink: "/book/show/50659471-a-court-of-frost-and-starlight",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1585622963i/50659471._UX187_.jpg",
  },
  {
    id: '010',
    title: "Things We Left Behind (Knockemout, #3)",
    pageLink: "/book/show/116536542-things-we-left-behind",
    imgSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1677175478i/116536542._UX187_.jpg",
  },
]