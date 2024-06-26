import { Typography } from "@mui/material";

interface Props {
  heading: string;
}

export default function Heading({ heading }: Props) {
  return (
    <Typography
      component="h3"
      variant="subtitle1"
      color="#333333"
      fontSize="1.25rem"
      fontWeight="bold"
      lineHeight={1.15}
      sx={{ margin: "36px 0 12px" }}
    >
      {heading}
    </Typography>
  );
}
