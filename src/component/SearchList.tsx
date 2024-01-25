import { Box, Button, List, ListItem, SxProps, Typography } from "@mui/material";
import SearchItem from "./SearchItem";

const sxSearchList: SxProps = {
  "li.MuiCard-root:last-child": {
    boxShadow: "none",
  },

  ".load_more_wrapper": {
    padding: "12px",
  },
};

export default function SearchList() {
  return (
    <Box sx={sxSearchList}>
      <Typography component="h2" fontWeight={500} padding="12px">
        "오리" 검색 시 62488개의 결과
      </Typography>

      <ul>
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </ul>

      <div className="load_more_wrapper">
        <Button fullWidth sx={{ bgcolor: "primary.light", color: "#181818", ":hover": { bgcolor: "primary.light" } }}>
          더 보기
        </Button>
      </div>
    </Box>
  );
}
