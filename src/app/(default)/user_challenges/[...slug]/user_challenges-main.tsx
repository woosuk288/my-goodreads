"use client";

import { Avatar, Box, Button, Card, CardActions, CardHeader, IconButton, LinearProgress, SxProps, Theme, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import BookPageHeading from "@/components/BookPageHeading";
import { DocumentData, DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import SearchBookItem from "@/components/SearchBookItem";

interface Props {
  challege: IChallenge & { id: string };
  thisYearReadBooks: (IShelfBook & { id: string })[];
}

export default function UserChallengesMain({ challege, thisYearReadBooks }: Props) {
  const readBookCount = thisYearReadBooks.length;
  const handleShareClick = () => {};

  return (
    <Box sx={sxUserChallengesMain}>
      <div className="challenge_summary">
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary" }} aria-label="username" src="https://mui.com/static/images/avatar/2.jpg">
                <LocalLibraryIcon />
              </Avatar>
            }
            title={
              <div>
                {challege.readingGoal}권 중에 {readBookCount}권을 읽었어요
              </div>
            }
            subheader={
              <Box sx={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={readBookCount} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {Math.floor((readBookCount / challege.readingGoal) * 100)}%
                  </Typography>
                </Box>
              </Box>
            }
          />
          <CardActions disableSpacing>
            <Button size="small">수정</Button>
            <Button size="small">과거 도전 내역</Button>
            <IconButton onClick={handleShareClick} aria-label="share" sx={{ marginLeft: "auto" }}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>

        <Typography sx={{ margin: "24px 4px", wordBreak: "keep-all", textAlign: "center", fontSize: "0.875rem" }}>
          좋아요! 남은 기간 동안 매주 2권씩 책을 읽으며 도전을 완수하세요
        </Typography>
      </div>

      <div className="book_read_section">
        <div className="book_read_heading_wrapper">
          <BookPageHeading title="올해 읽은 책" />
        </div>
        {readBookCount ? (
          <div className="book_read_list_wrapper">
            <ul>
              {thisYearReadBooks.map((book) => (
                <SearchBookItem key={book.id} kakaoBook={book.kakaoBook} currentReadStatus="read" />
              ))}
            </ul>
          </div>
        ) : (
          <Typography sx={{ margin: "48px" }} align="center">
            아직 없어요...
          </Typography>
        )}
      </div>
    </Box>
  );
}

const sxUserChallengesMain: SxProps<Theme> = (theme) => ({
  ".challenge_summary": {
    padding: "8px",
  },

  ".MuiCardHeader-avatar": {
    padding: "4px",
    border: "1px solid",
    borderColor: "primary.main",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
  },
  ".MuiCardHeader-title": {
    fontSize: "1rem",
    fontWeight: 600,
  },

  ".book_read_heading_wrapper": {
    marginBottom: "32px",
  },
});
