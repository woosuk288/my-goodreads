"use client";

import NextLink from "next/link";

import { Box, Divider, List, ListItem, ListItemButton, ListItemText, SxProps, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import BookPageHeading from "@/components/BookPageHeading";
import { USER_CHALLENGES_PATH, REVIEW_LIST_PATH, API_PROFILE } from "@/constants/routes";
import useSWR from "swr";
import { getProfile } from "@/lib/firebase/firestore";
import LoadingProgress from "@/components/LoadingProgress";

interface Props {
  uid: string;
  profile: IUser;
}

export default function ReviewListMain({ uid, profile }: Props) {
  const { data: profileData, isLoading } = useSWR(API_PROFILE, getProfile);

  if (isLoading) return <LoadingProgress />;

  return (
    <Box sx={sxReviewList}>
      <section className="shelf_section">
        <BookPageHeading title="내 서재" component="h1" />

        <ListItemButton component={NextLink} href={`${REVIEW_LIST_PATH}/${uid}` + `?shelf=read`}>
          <ListItemText primary="읽음" />
          <Typography color="grey">{profileData?.booksRead?.length}</Typography>
        </ListItemButton>
        <Divider />
        <ListItemButton component={NextLink} href={`${REVIEW_LIST_PATH}/${uid}` + `?shelf=reading`}>
          <ListItemText primary="읽는 중" />
          <Typography color="grey">{profileData?.booksReading?.length}</Typography>
        </ListItemButton>
        <Divider />
        <ListItemButton component={NextLink} href={`${REVIEW_LIST_PATH}/${uid}` + `?shelf=want`}>
          <ListItemText primary="읽고싶어요" />
          <Typography color="grey">{profileData?.booksWant?.length}</Typography>
        </ListItemButton>
        <Divider />
      </section>

      <section className="tag_section">
        <BookPageHeading title="태그" component="h2" />
        <Typography align="center">You don't have any tags yet. Add as many tags as you like to categorize your books.</Typography>
      </section>

      <section className="activity_section">
        <BookPageHeading title="Reading Activity" component="h2" />
        <List>
          <ListItemButton component={NextLink} href={`${USER_CHALLENGES_PATH}/${uid}/${new Date().getFullYear().toString()}`}>
            <ListItemText primary="Reading Challenge" />
            <NavigateNextIcon />
          </ListItemButton>
          <Divider />
          <ListItemButton component={NextLink} href="">
            <ListItemText primary="Edit your favorite genres" />
            <NavigateNextIcon />
          </ListItemButton>
          <Divider />
        </List>
      </section>
    </Box>
  );
}

const sxReviewList: SxProps = {
  padding: "12px",
  marginTop: "-12px",
  ".book_page_heading": {
    margin: "24px 0",
  },

  ".MuiListItemText-primary": {
    fontWeight: 500,
    fontSize: "1.0625rem",
  },

  ".activity_section": {
    paddingBottom: "100px",
  },
};
