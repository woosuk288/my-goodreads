import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar, Box, Button, IconButton, ListItemText, MenuItem, MenuList, SxProps, Theme, Toolbar } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const sxHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50px',
  backgroundColor: '#F4F1EA',

  "> div[class^=header_]": {
    display: 'flex'
  },

  ".header_left": {
    width: '25%',
    justifyContent: 'start',
    marginLeft: '16px',
  },

  ".header_center": {
    width: '50%',
    justifyContent: 'center',

  },

  ".header_right": {
    width: '25%',
    justifyContent: 'end',
    marginRight: '16px',
  },

  "button[aria-label='search']": {
    marginLeft: '-8px',
    "> svg": {
      fontSize: '1.8rem',
    }
  },
  "a[aria-label='Goodreads Home']": {
    backgroundImage: 'url(/images/logo-goodreads.svg)',
    backgroundSize: '100%',

    width: '140px',
    height: '30px'
  }


}

const sxAppBar: SxProps<Theme> = (theme) => ({
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
    color: '#333333'
  },


  // ".MuiMenuItem-root": {
  //   '&:active': {

  //   }
  // }
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
    link: '#',
  },
  {
    text: 'News & Interviews',
    link: '#',
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


interface IHeader {
  leftChild?: React.ReactNode
  centerChild: React.ReactNode
  rightChild?: React.ReactNode

}
export default function Header({ leftChild, centerChild: centerChild, rightChild }: IHeader) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      alert('로그인 or 내 서재')
    }
    setValue(newValue);
  };

  return (
    <Box sx={sxHeader}>
      {/* <div className="header_left">
        {leftChild}
      </div>
      <div className="header_center">
        {centerChild}
      </div>
      <div className="header_right">
        {rightChild}
      </div> */}

      <AppBar sx={sxAppBar} color="primary">
        <Toolbar>
          <IconButton>
            <SearchIcon aria-label='search' />
          </IconButton>

          {centerChild}

          {rightChild}

        </Toolbar>

        <Tabs value={value} onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="내 서재" />
          <Tab label="둘러보기" component={Button} endIcon={<ArrowDropDownIcon />} />
          <Tab label="커뮤니티" component={Button} endIcon={<ArrowDropDownIcon />} />
        </Tabs>


        <MenuList dense>
          {value === 1 && BROWSE_MENUS.map(menu =>
            <MenuItem>
              <ListItemText>{menu.text}</ListItemText>
            </MenuItem>
          )}
          {value === 2 && COMMUNITY_MENUS.map(menu =>
            <MenuItem>
              <ListItemText>{menu.text}</ListItemText>
            </MenuItem>
          )}
        </MenuList>

      </AppBar>
    </Box>
  )
}