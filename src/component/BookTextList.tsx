import { Box, List, ListItem, SxProps, Theme } from "@mui/material";

import Link from "../Link";

const sxBookTextList: SxProps<Theme> = (theme) => ({
  ".MuiList-root": {
    columnCount: 2,
    paddingTop: 0,
  },
  ".MuiLink-root": {
    fontSize: "0.875rem",
    color: theme.palette.secondary.dark,
  },
  ".MuiListItem-root": {
    padding: "6px 0",
  },
});

interface Props {
  bookTextData: {
    pageLink: string;
    text: string;
  }[];
}

export default function BookTextList({ bookTextData }: Props) {
  return (
    <Box sx={sxBookTextList}>
      <List>
        {bookTextData.map((item) => (
          <ListItem key={item.pageLink}>
            <Link href={item.pageLink}>{item.text}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
