"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";

import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TopicIcon from "@mui/icons-material/Topic";
import MailIcon from "@mui/icons-material/Mail";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { signOut } from "@/lib/firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { PROFILE_PATH } from "@/constants/routes";

const ANCHOR = "right";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",

  ".MuiIconButton-root": {
    padding: "4px",
    margin: "8px",
    backgroundColor: "#BEB2A2",
    color: "#FFFFFF",
  },
}));

export default function HeaderNavDrawer() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      searchParams.get("user-info-drawer") ? handleDrawerOpen() : setOpen(false);
    }
  }, [mounted, searchParams]);

  const handleDrawerClose = () => {
    setOpen(false);
    router.back();
  };

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (confirm("Are you sure?")) {
      signOut();
    }
  };

  return (
    <Drawer
      anchor={ANCHOR}
      open={open}
      onClose={handleDrawerClose}
      PaperProps={{ sx: { width: "85%", paddingLeft: "8px", paddingRight: "8px" } }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0,0,0,0.7)" },
          children: (
            <IconButton onClick={handleDrawerClose} sx={{ position: "absolute", left: 0, top: 0, color: "#FFFFFF" }}>
              <CloseIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          ),
        },
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

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            <Avatar sx={{ width: "75px", height: "75px", marginRight: "8px", backgroundColor: "#EFEEE0" }}>
              <Link href={PROFILE_PATH} component={NextLink}>
                <LocalLibraryIcon sx={{ color: "#DBD3BF", fontSize: "3.5rem" }} />
              </Link>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link href={PROFILE_PATH} color="#333333" variant="subtitle2" fontWeight="bold" component={NextLink}>
                WOOSEOK
              </Link>
            }
            secondary={
              <Link href={PROFILE_PATH} color="#000000" component={NextLink}>
                View profile
              </Link>
            }
          />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        {NAV_DRAWER_MENUS_01.map(({ link, text, disabled }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={NextLink} href={link} disabled={disabled}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List dense>
        {NAV_DRAWER_MENUS_02.map(({ link, text, onClick, disabled }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={NextLink} href={link} onClick={link === "/sign-out" ? handleSignOut : undefined} disabled={disabled}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

const NAV_DRAWER_MENUS_01 = [
  {
    link: PROFILE_PATH,
    text: "프로필",
    disabled: false,
  },
  {
    link: "/friend",
    text: "친구",
    disabled: true,
  },
  {
    link: "/group",
    text: "그룹",
    disabled: true,
  },
  {
    link: "/topic",
    text: "토론",
    disabled: true,
  },
  {
    link: "/comment",
    text: "댓글",
    disabled: true,
  },
  {
    link: "/challenges",
    text: "독서 챌린지",
    disabled: true,
  },
  {
    link: "/notes",
    text: "Notes & Highlights",
    disabled: true,
  },
  {
    link: "/quotes",
    text: "어록",
    disabled: true,
  },
  {
    link: "/user-edit-genres",
    text: "좋아하는 장르",
    disabled: true,
  },
  {
    link: "/recommendations",
    text: "친구들의 추천",
    disabled: true,
  },
];

const NAV_DRAWER_MENUS_02 = [
  {
    link: "/account-settings",
    text: "계정설정",
    disabled: true,
  },
  {
    link: "/help",
    text: "도움받기",
    disabled: true,
  },
  {
    link: "/sign-out",
    text: "로그아웃",
    disabled: false,
    onClick: true as const,
  },
];
