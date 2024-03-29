"use client";

import { Box, Container, SxProps, Typography } from "@mui/material";
import LoginButtonGroup from "../../../components/LoginButtonGroup";
import Link from "next/link";
import { HOME_PATH } from "@/constants/routes";

const sxLogin: SxProps = {
  display: "flex",
  height: "100vh",
};

const sxImageWrapper: SxProps = {
  flex: 1,
  display: { xs: "none", md: "block" },
  backgroundImage: `url("https://cdn.pixabay.com/photo/2016/11/29/02/56/blonde-1866951_1280.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "right",
};
const sxLoginWrapper: SxProps = {
  width: { xs: "100%", md: "500px" },
  padding: { xs: "16px", md: "30px 50px" },
};

const sxLogoWrapper: SxProps = {
  maxWidth: "180px",
  margin: "50px auto 15px auto",
  paddingBottom: "10px",
  textAlign: "center",

  "> img": {
    backgroundSize: "100% 100%",
    height: "40px",
    width: "181px",
  },
};

const authExternalProviders: SxProps = {
  borderBottom: "2px solid #ccc",
  marginBottom: "16px",
};

const sxAppLinkWrapper: SxProps = {
  margin: "24px 0",
  textAlign: "center",

  "> .text": {
    paddingBottom: "8px",
  },

  ".img_app_link": {
    maxWidth: "160px",
  },
};

export default function LoginPage() {
  return (
    <Box className="Login" sx={sxLogin}>
      <Box sx={sxImageWrapper}></Box>

      <Box sx={sxLoginWrapper}>
        <Box component={"header"} className="logo_wrapper" sx={sxLogoWrapper}>
          <Link href={HOME_PATH}>
            <img src="/images/logo-goodreads.svg" alt="goodreads" />
          </Link>
        </Box>

        <Box sx={authExternalProviders}>
          <LoginButtonGroup />

          <Box className="app_link_wrapper" sx={sxAppLinkWrapper}>
            <Typography textAlign="center" sx={{ marginBottom: "8px" }}>
              앱 다운로드 받기
            </Typography>
            <a href="#" rel="noopener noreferrer">
              <img
                className="img_app_link"
                src="https://s.gr-assets.com/assets/app/badge-android-highres-e46912ad93a09553adffc67550d3b562.png"
                alt="Download app for Android"
              />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
