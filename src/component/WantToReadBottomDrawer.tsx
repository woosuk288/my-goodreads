import React, { useState } from 'react';

import NextLink from 'next/link'

import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "../Link";
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Box, Button, CircularProgress, Drawer, List, ListItem, ListItemButton, SxProps, Theme } from '@mui/material';

const sxWantToReadBottomDrawer: SxProps = {
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

const slideUpMenuList: SxProps<Theme> = (theme) => ({
  paddingBottom: "0",
  backgroundColor: theme.palette.primary.light,

  "> li": {
    height: '48px',
    justifyContent: 'center',
    color: '#000000',
    boxShadow: '0 -1px 0 0 #bfbfbc',
    ":first-child": {
      boxShadow: '0 -3px 4px rgba(0,0,0,0.2)',
    },
    ":last-child": {
      justifyContent: 'space-between',
      "> .MuiButtonBase-root": {
        padding: "4px 0",
        color: "#000000",
      }
    }
  },
  "> li.Mui-selected": {
    backgroundColor: '#e3e4dd',
    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6)',
    fontWeight: 'bold',
  }
})


const WantToReadBottomDrawer = () => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleDrawer = (status: boolean) => () => {
    setOpen(status);

    handleClick();
  };

  const handleClick = () => {
    // 클릭 시 로딩 상태 변경
    setLoading(true);

    // 비동기 작업 또는 다른 로직 수행
    setTimeout(() => {
      // 로딩이 완료되면 로딩 상태 변경
      setLoading(false);
    }, 2000);
  };

  return (
    <Box sx={sxWantToReadBottomDrawer}>

      <Button className="wtr_button" variant="contained" color="inherit"
        startIcon={<DoneIcon />}
        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ExpandMoreIcon color="disabled" />}
        onClick={toggleDrawer(true)}
        disabled={loading}>
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
            <Button startIcon={<LibraryBooksIcon />} component={NextLink} href='#' >
              전체 책장 보기
              {/* <Link href='#' color="secondary">전체 책장 보기</Link> */}
            </Button>
            <Button color="secondary" startIcon={<CloseIcon />}>닫기</Button>


          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default WantToReadBottomDrawer   