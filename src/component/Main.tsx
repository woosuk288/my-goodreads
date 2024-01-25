import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

const sxMain: SxProps<Theme> = (theme) => ({
  paddingTop: "100px",
  maxWidth: theme.breakpoints.values.sm,
  margin: "0 auto",
});

interface IMain {
  children: ReactNode;
}

export default function Main({ children }: IMain) {
  return <Box sx={sxMain}>{children}</Box>;
}
