import { Box, Link, List, ListItem, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";

import NextLink from "next/link";
import React from "react";

const sxHomeTextList: SxProps<Theme> = (theme) => ({
  display: "flex",
  // justifyContent: "space-between",
  ".MuiList-root": {
    flex: 1,
    // paddingTop: 0,
  },
  ".MuiLink-root": {
    fontSize: "0.875rem",
    color: theme.palette.secondary.dark,
  },
  ".MuiListItem-root": {
    padding: "6px 0",
  },
});

interface ILinkAndText {
  pageLink: string;
  text: string;
  breakpoints?: string[];
}
interface Props {
  textLinks: ILinkAndText[];
}

export default function HomeTextList({ textLinks }: Props) {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const filteredList =
    textLinks.every((item) => !item.breakpoints) || mdMatches
      ? textLinks
      : smMatches
      ? textLinks.filter((item) => item.breakpoints?.includes("sm"))
      : textLinks.filter((item) => item.breakpoints?.includes("xs"));
  const twoDimesionDividedByFive = filteredList.reduce((acc: ILinkAndText[][], curr, idx) => {
    if (idx % 5 === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <Box sx={sxHomeTextList}>
      {twoDimesionDividedByFive.map((fiveItems, index) => (
        <List key={index}>
          {fiveItems.map((item) => (
            <ListItem key={item.pageLink}>
              <Link href={item.pageLink} component={NextLink}>
                {item.text}
              </Link>
            </ListItem>
          ))}
        </List>
      ))}
    </Box>
  );
}
