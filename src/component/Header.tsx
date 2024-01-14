import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar, Box, Button, IconButton, ListItemText, MenuItem, MenuList, SxProps, Theme, Toolbar } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HeaderNavDrawer from './HeaderNavDrawer';


const sxHeader: SxProps<Theme> = (theme) => ({

  "a[aria-label='Goodreads Home']": {
    backgroundImage: 'url(/images/logo-goodreads.svg)',
    backgroundSize: '100%',

    width: '140px',
    height: '30px'
  },

  boxShadow: 0,

  "> .MuiToolbar-root": {
    minHeight: '50px',
    height: '50px',
    justifyContent: 'space-between',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',

    "svg[aria-label='search']": {
      fontSize: '1.8rem',
    }
  },


  ".MuiTabs-root": {
    height: '50px',
  },
  ".MuiTabs-root .MuiButton-endIcon": {
    position: 'absolute',
    right: 16
  },
  ".MuiButton-text.MuiTab-root": {
    color: theme.palette.secondary.main,
  },
  ".MuiTab-root.Mui-selected": {
    backgroundColor: theme.palette.secondary.main,
    color: '#FFFFFF'
  },

  '.MuiList-root': {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    boxShadow: '0 5px 10px rgba(0,0,0,0.15)',
  },
})

const BROWSE_MENUS = [
  {
    text: '추천',
    link: '/recommendations',
  },
  {
    text: 'Choice Awards',
    link: '/choiceawards',
  },
  {
    text: '장르',
    link: '/genres',
  },
  {
    text: '혜택',
    link: '/giveaways',
  },
  {
    text: '인기',
    link: '/book/pupular-by-date/2024/1',
  },
  {
    text: 'Lists',
    link: '/list',
  },
  {
    text: 'Explore',
    link: '/explore',
  },
  {
    text: 'News & Interviews',
    link: '/news',
  },
]

const COMMUNITY_MENUS = [
  {
    text: '그룹',
    link: '/group',
  },
  {
    text: '어록',
    link: '/quotes',
  },
  {
    text: '저자에게 묻기',
    link: '/ask-the-author',
  },
]

const TAB_CODES = {
  MY_BOOKS: "MY_BOOKS",
  BROWSE: "BROWSE",
  COMMUNITY: "COMMUNITY"
}

interface IHeader {

}
export default function Header({ }: IHeader) {

  const [tabCode, setTabCode] = React.useState<string | boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('handleChange : ', newValue)
    if (newValue === TAB_CODES.MY_BOOKS) {
      alert('로그인 or 내 서재')
    }
    setTabCode(newValue);
  };

  const handleTabClick = (newValue: string) => () => {
    if (tabCode === newValue) {
      setTabCode(false)
    }
  }

  return (
    <AppBar sx={sxHeader} color="primary">
      <Toolbar>
        <IconButton>
          <SearchIcon aria-label='search' />
        </IconButton>

        <a href='/' aria-label='Goodreads Home' title='Goodreads Home'></a>

        <HeaderNavDrawer />

        <Button variant='contained' color='secondary' size='small'>Sign in</Button>

      </Toolbar>

      <Tabs value={tabCode} onChange={handleChange} variant="fullWidth">
        <Tab label="내 서재" value={TAB_CODES.MY_BOOKS} onClick={handleTabClick(TAB_CODES.MY_BOOKS)} />
        <Tab label="둘러보기" value={TAB_CODES.BROWSE} component={Button} endIcon={<ArrowDropDownIcon />} onClick={handleTabClick(TAB_CODES.BROWSE)} />
        <Tab label="커뮤니티" value={TAB_CODES.COMMUNITY} component={Button} endIcon={<ArrowDropDownIcon />} onClick={handleTabClick(TAB_CODES.COMMUNITY)} />
      </Tabs>


      {tabCode && tabCode !== TAB_CODES.MY_BOOKS &&
        <MenuList dense>
          {tabCode === TAB_CODES.BROWSE && BROWSE_MENUS.map(menu =>
            <MenuItem key={menu.link}>
              <ListItemText>{menu.text}</ListItemText>
            </MenuItem>
          )}
          {tabCode === TAB_CODES.COMMUNITY && COMMUNITY_MENUS.map(menu =>
            <MenuItem key={menu.link}>
              <ListItemText>{menu.text}</ListItemText>
            </MenuItem>
          )}
        </MenuList>
      }

    </AppBar>
  )
}