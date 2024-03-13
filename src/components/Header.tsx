"use client";

import * as React from "react";

import NextLink from "next/link";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  ListItemText,
  MenuItem,
  MenuList,
  SxProps,
  Theme,
  Toolbar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HeaderNavDrawer from "./HeaderNavDrawer";
import { signInWithGoogle } from "@/lib/firebase/auth";
import SearchBookAutocomplete from "./SearchBookAutocomplete";
import { useAuth } from "./AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { LOGIN_PATH, REVIEW_LIST_PATH } from "@/constants/routes";

interface IHeader {
  // initialUser: User | undefined | null;
}
export default function Header({}: /* initialUser */ IHeader) {
  const router = useRouter();
  const pathname = usePathname();
  const authState = useAuth();

  const [tabCode, setTabCode] = React.useState<string | boolean>(false);

  React.useEffect(() => {
    if (TAB_CODES.MY_BOOKS === tabCode && pathname !== REVIEW_LIST_PATH + `/${authState.user?.uid}`) {
      setTabCode(false);
    }
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabCode(newValue);
    if (newValue === TAB_CODES.MY_BOOKS) {
      authState.state === "loaded" && authState.isLoggedIn && router.push(REVIEW_LIST_PATH + `/${authState.user?.uid}`);
    }
  };

  const handleTabClick = (newValue: string) => () => {
    if (tabCode === newValue) {
      setTabCode(false);
    }
  };

  const handleClose = () => {
    setTabCode(false);
  };

  const handleSignInWithGoogle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <AppBar sx={sxHeader}>
      <Container maxWidth="lg" disableGutters className="desktop_container">
        <Toolbar sx={sxToolbar} variant="dense">
          <NextLink href="/" aria-label="Goodreads Home" title="Goodreads Home"></NextLink>

          <Tabs sx={sxTabs} value={tabCode} onChange={handleChange} variant="fullWidth">
            <Tab label="내 서재" value={TAB_CODES.MY_BOOKS} component={Button} />
            <Tab
              label="둘러보기"
              value={TAB_CODES.BROWSE}
              component={Button}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleTabClick(TAB_CODES.BROWSE)}
            />
            <Tab
              label="커뮤니티"
              value={TAB_CODES.COMMUNITY}
              component={Button}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleTabClick(TAB_CODES.COMMUNITY)}
            />
          </Tabs>

          <Box sx={sxAutoCompleteWrapper}>
            <SearchBookAutocomplete />
          </Box>

          <Box sx={sxUtils}>
            {authState.state === "loading" ? (
              <CircularProgress size={32} />
            ) : authState.state === "loaded" && !authState.user ? (
              <Button variant="contained" size="small" component={NextLink} href={LOGIN_PATH} onClick={handleSignInWithGoogle}>
                Sign in
              </Button>
            ) : (
              <HeaderNavDrawer />
            )}
          </Box>
        </Toolbar>

        {tabCode && tabCode !== TAB_CODES.MY_BOOKS && (
          <MenuList dense sx={sxList(tabCode)}>
            {tabCode === TAB_CODES.BROWSE &&
              BROWSE_MENUS.map((menu) => (
                <MenuItem key={menu.link} onClick={handleClose}>
                  <ListItemText>{menu.text}</ListItemText>
                </MenuItem>
              ))}
            {tabCode === TAB_CODES.COMMUNITY &&
              COMMUNITY_MENUS.map((menu) => (
                <MenuItem key={menu.link} onClick={handleClose}>
                  <ListItemText>{menu.text}</ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        )}
      </Container>

      <Container maxWidth="md" disableGutters className="mobile_container">
        <Toolbar sx={sxToolbar} variant="dense">
          <NextLink href="/" aria-label="Goodreads Home" title="Goodreads Home"></NextLink>

          <Box sx={sxAutoCompleteWrapper}>
            <SearchBookAutocomplete />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const sxHeader: SxProps<Theme> = (theme) => ({
  backgroundColor: "primary.light",
  ".desktop_container": {
    display: { xs: "none", md: "block" },
  },
  ".mobile_container": {
    display: { xs: "block", md: "none" },
  },

  "a[aria-label='Goodreads Home']": {
    backgroundImage: "url(/images/logo-goodreads.svg)",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",

    width: "140px",
    height: "30px",
  },

  boxShadow: 0,

  // "button.MuiTab-root": {
  //   color: theme.palette.secondary.main,
  // },
  // ".MuiTab-root.Mui-selected": {
  //   backgroundColor: theme.palette.secondary.main,
  //   color: '#FFFFFF'
  // },
});

const sxToolbar: SxProps = {
  // minHeight: "50px",
  height: "50px",
  justifyContent: "space-between",
  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",

  "svg[aria-label='search']": {
    fontSize: "1.8rem",
  },
};

const sxList = (tabCode: string | boolean): SxProps => ({
  position: "absolute",
  left: tabCode === TAB_CODES.COMMUNITY ? "372px" : "272px",
  // left: "272px",
  backgroundColor: "#FFFFFF",
  color: "#333333",
  boxShadow: "0 5px 10px rgba(0,0,0,0.15)",
});

const sxTabs: SxProps = {
  height: "50px",
  marginLeft: "8px",

  ".MuiButton-endIcon": {
    position: "absolute",
    right: 8,
  },

  ".MuiTab-root": {
    width: "100px",
    // padding: "12px 24px 12px 8px",
  },
};

const sxUtils: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginLeft: "12px",
  marginRight: "-8px",
};

const sxAutoCompleteWrapper = {
  marginLeft: "auto",
};

const BROWSE_MENUS = [
  {
    text: "추천",
    link: "/recommendations",
  },
  {
    text: "Choice Awards",
    link: "/choiceawards",
  },
  {
    text: "장르",
    link: "/genres",
  },
  {
    text: "혜택",
    link: "/giveaways",
  },
  {
    text: "인기",
    link: "/book/pupular-by-date/2024/1",
  },
  {
    text: "Lists",
    link: "/list",
  },
  {
    text: "Explore",
    link: "/explore",
  },
  {
    text: "News & Interviews",
    link: "/news",
  },
];

const COMMUNITY_MENUS = [
  {
    text: "그룹",
    link: "/group",
  },
  {
    text: "어록",
    link: "/quotes",
  },
  {
    text: "저자에게 묻기",
    link: "/ask-the-author",
  },
];

const TAB_CODES = {
  MY_BOOKS: "MY_BOOKS",
  BROWSE: "BROWSE",
  COMMUNITY: "COMMUNITY",
};
