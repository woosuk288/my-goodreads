"use client";

import NextLink from "next/link";

import { Box, Divider, List, ListItem, ListItemButton, ListItemText, SxProps, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import BookPageHeading from "@/components/BookPageHeading";

interface Props {
  profile: IUser;
}

export default function ReviewList({ profile }: Props) {
  return (
    <Box sx={sxReviewList}>
      <section className="shelf_section">
        <BookPageHeading title="내 서재" component="h1" />

        <ListItemButton component={NextLink} href="">
          <ListItemText primary="읽음" />
          <Typography color="grey">{profile.booksRead?.length}</Typography>
        </ListItemButton>
        <Divider />
        <ListItemButton component={NextLink} href="">
          <ListItemText primary="읽는 중" />
          <Typography color="grey">{profile.booksReading?.length}</Typography>
        </ListItemButton>
        <Divider />
        <ListItemButton component={NextLink} href="">
          <ListItemText primary="읽고싶어요" />
          <Typography color="grey">{profile.booksWant?.length}</Typography>
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
          <ListItemButton component={NextLink} href="">
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
