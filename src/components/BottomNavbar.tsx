"use client";

import * as React from "react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useAuth } from "./AuthProvider";
import { EXPLORE_PATH, HOME_PATH, LOGIN_PATH, REVIEW_LIST_PATH } from "@/constants/routes";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openDrawer = searchParams.get("user-info-drawer");
  const { state, user } = useAuth();
  // const [value, setValue] = React.useState(-1);

  return (
    <Box sx={sxBottomNavbar}>
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <BottomNavigationAction
          disabled={state === "loading"}
          label="내 서재"
          icon={pathname === REVIEW_LIST_PATH + `/${user?.uid}` ? <CollectionsBookmarkIcon /> : <CollectionsBookmarkOutlinedIcon />}
          href={user?.uid ? REVIEW_LIST_PATH + `/${user.uid}` : LOGIN_PATH}
          component={NextLink}
        />
        <BottomNavigationAction
          disabled={state === "loading"}
          label="둘러보기"
          icon={pathname === HOME_PATH ? <ExploreIcon /> : <ExploreOutlinedIcon />}
          href={HOME_PATH}
          component={NextLink}
        />
        <BottomNavigationAction
          disabled={state === "loading"}
          label="내 정보"
          icon={openDrawer ? <LocalLibraryIcon /> : <LocalLibraryOutlinedIcon />}
          href={{ query: "user-info-drawer=true" }}
          component={NextLink}
        />
      </BottomNavigation>
    </Box>
  );
}

const sxBottomNavbar: SxProps = {
  display: { md: "none" },
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: "100",
  ".MuiBottomNavigation-root": {
    bgcolor: "primary.light",
  },
};
