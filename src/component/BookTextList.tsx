import { Box, List, ListItem, SxProps } from "@mui/material";

import Link from '../Link'


const sxBookTextList: SxProps = {

  ".MuiList-root": {
    columnCount: 2
  },
  ".MuiLink-root": {
    fontSize: '0.875rem',
    color: '#00635D',
  },
  ".MuiListItem-root": {
    paddingLeft: 0,
    paddingRight: 0,
  }
}

interface Props {

}

export default function BookTextList() {
  return (
    <Box sx={sxBookTextList}>
      <List className="gr-listOfLinks" dense>
        <ListItem className="gr-listOfLinks__item">
          <Link className="gr-hyperlink" href="/list/tag/fiction">Fiction book lists</Link>
        </ListItem>
        <ListItem className="gr-listOfLinks__item">
          <Link className="gr-hyperlink" href="/list/show/130.Best_Audiobooks_Ever">Best audiobooks ever</Link>
        </ListItem>
        <ListItem className="gr-listOfLinks__item">
          <Link className="gr-hyperlink" href="/list/show/86.Best_Children_s_Books">Best children’s books</Link>
        </ListItem>
        <ListItem className="gr-listOfLinks__item">
          <Link className="gr-hyperlink" href="/list/show/2681.Time_Magazine_s_All_Time_100_Novels">Best novels of all time</Link>
        </ListItem>
        <ListItem className="gr-listOfLinks__item">
          <Link className="gr-hyperlink" href="/list/tag/romance">Romance book lists</Link>
        </ListItem>
        <ListItem className="gr-listOfLinks__item">
          <Link className="gr-hyperlink" href="/list">See more lists</Link>
        </ListItem>
      </List>
    </Box>
  )
}