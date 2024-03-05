"use client";

import { Avatar, Box, Button, Card, CardActions, CardHeader, IconButton, LinearProgress, SxProps, Theme, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export default function UserChallengesMain() {
  const handleShareClick = () => {};

  return (
    <Box sx={sxUserChallengesMain}>
      <Box>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary" }} aria-label="recipe" src="https://mui.com/static/images/avatar/2.jpg">
                <LocalLibraryIcon />
              </Avatar>
            }
            title={<div>100권 중에 6권을 읽었어요</div>}
            subheader={
              <Box sx={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={6} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {"6"}%
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
      </Box>
    </Box>
  );
}

const sxUserChallengesMain: SxProps<Theme> = (theme) => ({
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
});
