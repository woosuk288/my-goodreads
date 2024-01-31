"use client";

import { Box, Button, Link, SxProps } from "@mui/material";
import { SIGNIN_PATH, SIGNUP_PATH } from "../constants/routes";

import NextLink from "next/link";

const signin_wrapper: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  // padding: '0 12px',
  // margin: 'auto',

  "> button, > a": {
    width: "100%",
    maxWidth: "600px",
    marginBottom: "1rem",
    height: "48px",
    lineHeight: 3,
    fontWeight: 600,
    fontSize: "1rem",
  },
};

const KakaoButton: SxProps = {
  backgroundColor: "#FEE500",
  color: "rgba(0, 0, 0, 0.85)",

  ":hover": {
    backgroundColor: "#FEE500",
  },
  ":before": {
    content: '""',
    display: "block",
    width: "20px",
    height: "20px",
    backgroundImage: "url(/images/logo-kakao.png)",
    backgroundSize: "20px",
    marginRight: "8px",
    marginLeft: "-4px",
  },
};

const NaverButton: SxProps = {
  backgroundColor: "#03C75A",
  color: "#FFFFFF",
  ":hover": {
    backgroundColor: "#03C75A",
  },
  ":before": {
    content: '""',
    display: "block",
    width: "20px",
    height: "20px",
    backgroundImage: "url(/images/logo-naver.png)",
    backgroundSize: "20px",
    marginRight: "8px",
    marginLeft: "-4px",
  },
};

const EmailButton: SxProps = {
  backgroundColor: "#382110",
  color: "#FFFFFF",
  ":hover": {
    backgroundColor: "#382110",
  },
};

export default function LoginForm() {
  return (
    <Box className="LoginForm" sx={signin_wrapper}>
      <Button variant="contained" sx={KakaoButton}>
        카카오로 시작하기
      </Button>
      <Button variant="contained" sx={NaverButton}>
        네이버로 시작하기
      </Button>
      <Button variant="contained" sx={EmailButton} component={NextLink} href={SIGNIN_PATH}>
        이메일로 로그인하기
      </Button>

      <div className="auth_switch_flow">
        {/* 이미 가입하셨나요? <Link href={'/signin'}>로그인하기</Link> */}
        아직 가입하지 않으셨나요?{" "}
        <Link href={SIGNUP_PATH} component={NextLink}>
          가입하기
        </Link>
      </div>
    </Box>
  );
}
