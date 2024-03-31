"use client";

import { HOME_PATH } from "@/constants/routes";
import { HEADER_HEIGHT } from "@/constants/values";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const sxMain = (theme: Theme, pathname: string): SxProps<Theme> => ({
  paddingTop: HEADER_HEIGHT,
  maxWidth: pathname === HOME_PATH ? theme.breakpoints.values.lg : theme.breakpoints.values.sm,
  margin: "0 auto",
  paddingBottom: { xs: "56px", md: "0" },
  minHeight: { md: "100vh" },
});

interface IMain {
  children: ReactNode;
}

export default function Main({ children }: IMain) {
  const theme: Theme = useTheme();
  const pathname = usePathname();

  return (
    <Box sx={sxMain(theme, pathname)} component="main">
      {children}
    </Box>
  );
}
