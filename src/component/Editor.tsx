import { Box, Card, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemButton, ListItemText, Rating, SxProps, TextField, Theme, Typography } from "@mui/material"

const sxEditor: SxProps = {
  padding: '12px',

  ".MuiCardMedia-root": {
    objectFit: 'contain',
    alignSelf: 'flex-start'
  },

  ".MuiCard-root": {
    display: 'flex',
    boxShadow: 'none',
  },
  ".book_info": {
    paddingRight: 0,
    paddingTop: 0,
  },
  ".book_title": {
    fontWeight: 'bold',
  },

  ".book_meta_info": {
    display: 'flex',
    alignItems: 'center',
    "& > *": {
      fontSize: '0.75rem',
    }
  },
  ".static_stars": {
    marginRight: '2px'
  },
  ".book_rating_count": {
    ":before, :after": {
      content: "'\\00b7'",
      fontWeight: 'bold',
      marginLeft: '4px',
      marginRight: '4px'
    },
  },

  ".user_rating": {
    textAlign: 'center',
    margin: '20px 0',
  },
  ".user_rating_stars": {
    fontSize: '3rem',
  },

  ".spoiler_wrapper": {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '8px 0',
  },

}

const slideUpMenuList: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 -3px 4px rgba(0,0,0,0.2)',
  "> li": {
    justifyContent: 'center',
    color: '#000000',
    boxShadow: '0 -1px 0 0 #bfbfbc',
    ":first-child": {
      boxShadow: '0 -3px 4px rgba(0,0,0,0.2)'
    }
  },
  "> li.Mui-selected": {
    backgroundColor: '#e3e4dd',
    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6)',
    fontWeight: 'bold'
  }
})


// TODO: form의 기준
export default function Editor() {


  const [rating, setRating] = React.useState<number | null>(0);

  return (
    <Box sx={sxEditor}>

      <Card>
        <CardMedia
          component="img"
          sx={{ width: 75 }}
          image="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1445791874i/25614523._UX75_.jpg"
          alt="Book cover for Originals: How Non-Conformists Move the World"
        />

        <Box component='form'>
          <CardContent className="book_info">
            <Typography className="book_title" component="div" variant="h5">
              Originals: How Non-Conformists Move the World
            </Typography>
            <Typography variant="subtitle1" component="div">
              by Adam M. Grant
            </Typography>
            <div className="book_meta_info">

              <Rating className="static_stars" name="read-only" value={3.95} readOnly precision={0.01} size="small" />
              <Typography variant="body2" color='text.secondary'>3.95</Typography>
              <Typography className="book_rating_count" variant="body2" color='text.secondary'>52,241 평가</Typography>

              <Typography variant="body2" color='text.secondary'>
                <meta content="3430" itemProp="reviewCount" />
                3,430 리뷰</Typography>
              {/* <span className="bookMetaInfo__reviewCount">
              </span> */}
            </div>
          </CardContent>
        </Box>
      </Card>

      {/* read status */}
      <BottomSheetExample />

      {/* rate */}
      {/* 당신의 평점 (1~5단계 watcha) */}
      <div className="user_rating">
        <Typography component="legend" variant="subtitle2">평가해 보세요</Typography>
        <Rating
          className="user_rating_stars"
          name="user-rating"
          size="large"
          precision={0.5}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
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
        <Typography variant="body2" color="text.secondary">1분전에 마지막으로 수정</Typography>

      </div>

      <Button color="secondary" variant="contained">게시하기</Button>

    </Box>
  )
}



import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "../Link";
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const sxBottomSheet: SxProps = {

  margin: '12px 0',

  textAlign: 'center',

  ".wtr_button": {
    width: '160px',
    justifyContent: 'flex-start',

    "> .MuiButton-endIcon ": {
      marginLeft: 'auto',
    }
  }
}

const BottomSheetExample = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (status: boolean) => () => {
    setOpen(status);
  };

  return (
    <Box sx={sxBottomSheet}>

      <Button className="wtr_button" variant="contained" color="inherit"
        startIcon={<DoneIcon />}
        endIcon={<ExpandMoreIcon color="disabled" />}
        onClick={toggleDrawer(true)} >
        읽음
      </Button>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
      // transitionDuration={500}
      >


        {/* Bottom Sheet 내용 */}
        {/* Your Bottom Sheet Content Goes Here */}
        <List sx={slideUpMenuList}>
          <ListItemButton component="li">읽고 싶어요</ListItemButton>
          <ListItemButton component="li">현재 읽는 중</ListItemButton>
          <ListItemButton component="li" selected>읽음</ListItemButton>
          <ListItemButton component="li">책장에서 빼기</ListItemButton>
          <ListItem component="li">
            <Button startIcon={<LibraryBooksIcon />}>
              <Link href='#' color="secondary">전체 책장 보기</Link>
            </Button>


            <Button color="secondary" startIcon={<CloseIcon />}>닫기</Button>

          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
