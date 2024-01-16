import { Typography } from "@mui/material";

interface Props {
  heading: string
}

export default function Heading({ heading }: Props) {
  return (
    <Typography component='h3' variant='subtitle2' color="#333333" fontWeight='bold' lineHeight={1.15} sx={{ margin: '12px 0' }} >
      {heading}
    </Typography>
  )
}