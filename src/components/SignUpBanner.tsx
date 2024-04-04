"use client";

import { Box, Button, IconButton, SxProps, Typography, Zoom } from "@mui/material";
import { LOGIN_PATH } from "../constants/routes";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

export default function SignUpBanner() {
  const authState = useAuth();

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  if (authState.state === "loaded" && !authState.isLoggedIn) {
    return (
      <Box className="site_banner" bgcolor="primary.light" sx={sxSiteBanner(show)}>
        <Box className="site_banner_content" position="relative" textAlign="center" padding="24px 32px">
          <Typography component="h2" fontWeight="bold">
            Join Goodreads
          </Typography>
          <Typography component="h3" color="text.secondary" marginBottom="12px">
            and meet your next favorite book!
          </Typography>
          <Button variant="outlined" href={LOGIN_PATH} sx={{ textTransform: "capitalize" }}>
            Sign Up Now
          </Button>
          <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return null;
}

const sxSiteBanner = (show: boolean): SxProps => ({
  position: "relative",
  transition: "all 1000ms",
  top: show ? 0 : "-200px",
  height: show ? "144px" : 0,
  // transform: show ? "top" : "scaleY(0)",
  // transformOrigin: "top center",
  // visibility: show ? "visible" :  "hidden",
});
