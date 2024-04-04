"use client";

import * as React from "react";
import NextLink from "next/link";

import { AppBar, Box, Button, CircularProgress, Container, IconButton, Menu, MenuItem, SxProps, Theme, Toolbar } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import SearchBookAutocomplete from "./SearchBookAutocomplete";
import { useAuth } from "./AuthProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LOGIN_PATH, REVIEW_LIST_PATH } from "@/constants/routes";

interface IHeader {
  // initialUser: User | undefined | null;
}
export default function Header({}: /* initialUser */ IHeader) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authState = useAuth();

  const [openSearchbar, setOpenSearchbar] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("event.currentTarget.id : ", event.currentTarget.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleOpenSearchbar = () => {
    setOpenSearchbar(true);
  };
  const handleCloseSearchbar = () => {
    setOpenSearchbar(false);
  };

  const handleDrawerOpen = () => {
    router.push(pathname + "?" + createQueryString("user-info-drawer", "true"));
  };

  return (
    <AppBar sx={sxHeader}>
      <Container maxWidth="lg" disableGutters className="desktop_container">
        <Toolbar sx={sxToolbar} variant="dense">
          <NextLink href="/" aria-label="Goodreads Home" title="Goodreads Home"></NextLink>

          <Box sx={sxHeaderMenus}>
            <div>
              <Button
                className="menu_button"
                component={NextLink}
                href={authState.user ? `${REVIEW_LIST_PATH}/${authState.user.uid}` : LOGIN_PATH}
                disabled={authState.state === "loading"}
              >
                내 서재
              </Button>
            </div>
            {HEDAER_MENUS.map((item) => (
              <div key={item.id}>
                <Button
                  id={item.id}
                  aria-controls={anchorEl?.id === item.id ? item.id.replace("-button", "") : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl?.id === item.id ? "true" : undefined}
                  className="menu_button"
                  onClick={handleClick}
                  disabled={authState.state === "loading"}
                >
                  {item.text}
                </Button>
                <Menu
                  className="menu_list"
                  id={item.id.replace("-button", "")}
                  anchorEl={anchorEl}
                  open={anchorEl?.id === item.id}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": item.id,
                  }}
                >
                  {item.menus.map((menu) => (
                    <MenuItem key={menu.link} onClick={handleClose} component={NextLink} href={menu.link} disabled={menu.disabled}>
                      {menu.text}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}
          </Box>

          <Box sx={sxAutoCompleteWrapper}>
            <SearchBookAutocomplete />
          </Box>

          <Box sx={sxUtils}>
            {authState.state === "loading" ? (
              <CircularProgress size={32} />
            ) : authState.state === "loaded" && !authState.user ? (
              <Button variant="contained" size="small" component={NextLink} href={LOGIN_PATH}>
                Sign in
              </Button>
            ) : (
              <IconButton
                onClick={handleDrawerOpen}
                size="small"
                sx={{ marginRight: "3px", backgroundColor: "#EFEEE0", border: "1px solid #DBD3BF" }}
                aria-label="open-drawer-my-info"
              >
                <LocalLibraryIcon sx={{ fontSize: "1.5rem" }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Container maxWidth="md" disableGutters className="mobile_container">
        <Toolbar sx={sxToolbar} variant="dense">
          <div style={{ width: "40px" }}></div>

          <NextLink href="/" aria-label="Goodreads Home" title="Goodreads Home"></NextLink>

          <IconButton edge="end" onClick={handleOpenSearchbar}>
            <SearchIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>

          {openSearchbar && (
            <Box sx={sxMobileAutoCompleteWrapper}>
              <SearchBookAutocomplete onClose={handleCloseSearchbar} />
              <Button color="secondary" onClick={handleCloseSearchbar}>
                취소
              </Button>
            </Box>
          )}
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
});

const sxToolbar: SxProps = {
  // minHeight: "50px",
  height: "50px",
  justifyContent: "space-between",
  // boxShadow: "0 1px 2px rgba(0,0,0,0.15)",

  "svg[aria-label='search']": {
    fontSize: "1.8rem",
  },
};

const sxHeaderMenus: SxProps = {
  display: "flex",
  marginLeft: "8px",

  ".menu_button": {
    height: "50px",
    width: "100px",
  },
  ".menu_list": {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
};

const sxUtils: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginLeft: "12px",
  marginRight: "-8px",
};

const sxAutoCompleteWrapper: SxProps = {
  width: "100%",
  maxWidth: "300px",
  marginLeft: "auto",
};
const sxMobileAutoCompleteWrapper: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "primary.light",
  padding: "5px 8px",
  //  backgroundColor: "#F4F1EA"
  position: "absolute",
  top: 0,
  // left: 0,
  right: 0,
};

const BROWSE_MENUS = [
  {
    disabled: false,
    text: "추천",
    link: "/recommendations",
  },
  {
    disabled: true,
    text: "Choice Awards",
    link: "/choiceawards",
  },
  {
    disabled: false,
    text: "장르",
    link: "/genres",
  },
  {
    disabled: true,
    text: "혜택",
    link: "/giveaways",
  },
  {
    disabled: false,
    text: "인기",
    link: "/book/pupular-by-date/2024/1",
  },
  {
    disabled: true,
    text: "Lists",
    link: "/list",
  },
  {
    disabled: true,
    text: "Explore",
    link: "/explore",
  },
  {
    disabled: true,
    text: "News & Interviews",
    link: "/news",
  },
];

const COMMUNITY_MENUS = [
  {
    disabled: true,
    text: "그룹",
    link: "/group",
  },
  {
    disabled: false,
    text: "어록",
    link: "/quotes",
  },
  {
    disabled: true,
    text: "저자에게 묻기",
    link: "/ask-the-author",
  },
];

const HEDAER_MENUS = [
  // {
  //   id: "menu-button-shelves",
  //   disabled: true,
  //   text: "내 서재",
  // },
  {
    id: "menu-button-explore",
    disabled: true,
    text: "둘러보기",
    menus: BROWSE_MENUS,
  },
  {
    id: "menu-button-community",
    disabled: true,
    text: "커뮤니티",
    menus: COMMUNITY_MENUS,
  },
];
