import { useState } from "react";
import NextLink from 'next/link'

import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import NotificationsIcon from '@mui/icons-material/Notifications';
import TopicIcon from '@mui/icons-material/Topic';
import MailIcon from '@mui/icons-material/Mail';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import Link from "../Link";


const ANCHOR = 'right'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',

  ".MuiIconButton-root": {
    padding: '4px',
    margin: '8px',
    backgroundColor: '#BEB2A2',
    color: '#FFFFFF',
  }
}));


export default function HeaderNavDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleDrawerOpen}>{ANCHOR}</IconButton>

      <Drawer
        anchor={ANCHOR}
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: '85%', paddingLeft: '8px', paddingRight: '8px' } }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(0,0,0,0.7)' },
            children: (
              <IconButton
                onClick={handleDrawerClose}
                sx={{ position: 'absolute', left: 0, top: 0, color: '#FFFFFF' }}
              >
                <CloseIcon sx={{ fontSize: '2.5rem' }} />
              </IconButton>
            ),
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <TopicIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <MailIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <GroupsIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem >
            <ListItemAvatar>
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              <Avatar sx={{ width: '75px', height: '75px', marginRight: '8px', backgroundColor: '#EFEEE0', }}>
                <Link href="/user/123">
                  <LocalLibraryIcon sx={{ color: "#DBD3BF", fontSize: '3.5rem' }} />
                </Link>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Link href="/user/123" color="#333333" variant="subtitle2" fontWeight='bold'>WOOSEOK</Link>}
              secondary={<Link href="/user/123" color='#000000'>View profile</Link>}
            />
          </ListItem>
        </List>
        <Divider />
        <List dense>
          {NAV_DRAWER_MENUS_01.map(({ link, text }, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={NextLink} href={link}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

        </List>
        <Divider />
        <List dense>
          {NAV_DRAWER_MENUS_02.map(({ link, text }, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={NextLink} href={link}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

const NAV_DRAWER_MENUS_01 = [
  {
    link: "/profile",
    text: "프로필"
  },
  {
    link: "/friend",
    text: "친구"
  },
  {
    link: "/group",
    text: "그룹"
  },
  {
    link: "/topic",
    text: "토론"
  },
  {
    link: "/comment",
    text: "댓글"
  },
  {
    link: "/challenges",
    text: "독서 챌린지"
  },
  {
    link: "/notes",
    text: "Kindle Notes & Highlights"
  },
  {
    link: "/quotes",
    text: "어록"
  },
  {
    link: "/user-edit-genres",
    text: "좋아하는 장르",
  },
  {
    link: "/recommendations",
    text: "친구들의 추천"
  },
]

const NAV_DRAWER_MENUS_02 = [
  {
    link: "/account-settings",
    text: "계정설정"
  },
  {
    link: "/help",
    text: "도움받기"
  },
  {
    link: "/sign-out",
    text: "로그아웃"
  },
]