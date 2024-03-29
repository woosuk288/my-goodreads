"use client";

import { HEADER_HEIGHT } from "@/constants/values";
import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

const sxMain: SxProps<Theme> = (theme) => ({
  paddingTop: HEADER_HEIGHT,
  maxWidth: theme.breakpoints.values.sm,
  margin: "0 auto",
  paddingBottom: { xs: "56px", md: "0" },
  minHeight: { md: "100vh" },
});

interface IMain {
  children: ReactNode;
}

export default function Main({ children }: IMain) {
  return (
    <Box sx={sxMain} component="main">
      {children}
    </Box>
  );
}
