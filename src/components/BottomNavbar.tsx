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
import { EXPLORE_PATH, REVIEW_LIST_PATH } from "@/constants/routes";
import NextLink from "next/link";

export default function BottomNavbar() {
  const { state, user } = useAuth();
  const [value, setValue] = React.useState(-1);

  return (
    <Box sx={sxBottomNavbar}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="내 서재"
          icon={value === 0 ? <CollectionsBookmarkIcon /> : <CollectionsBookmarkOutlinedIcon />}
          href={REVIEW_LIST_PATH + `/${user?.uid}`}
          component={NextLink}
        />
        <BottomNavigationAction
          label="둘러보기"
          icon={value === 1 ? <ExploreIcon /> : <ExploreOutlinedIcon />}
          href={EXPLORE_PATH}
          component={NextLink}
        />
        <BottomNavigationAction
          label="내 정보"
          icon={value === 2 ? <LocalLibraryIcon /> : <LocalLibraryOutlinedIcon />}
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
