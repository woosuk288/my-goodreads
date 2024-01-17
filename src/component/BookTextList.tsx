import { Box, List, ListItem, SxProps } from "@mui/material";

import Link from '../Link'


const sxBookTextList: SxProps = {

  ".MuiList-root": {
    columnCount: 2,
    paddingTop: 0,
  },
  ".MuiLink-root": {
    fontSize: '0.875rem',
    color: '#00635D',
  },
  ".MuiListItem-root": {
    padding: '6px 0'
  }
}

interface Props {
  bookTextData: {
    pageLink: string
    text: string
  }[]
}

export default function BookTextList({ bookTextData }: Props) {
  return (
    <Box sx={sxBookTextList}>
      <List>
        {bookTextData.map(item =>
          <ListItem >
            <Link href={item.pageLink}>{item.text}</Link>
          </ListItem>
        )}

      </List>
    </Box>
  )
}