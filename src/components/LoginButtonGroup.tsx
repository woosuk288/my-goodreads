"use client";

import { Box, Button, Link, SxProps } from "@mui/material";
import { HOME_PATH, SIGNIN_EMAIL_PATH, SIGNUP_EMAIL_PATH } from "../constants/routes";

import NextLink from "next/link";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

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
    ":before": {
      content: '""',
      display: "block",
      width: "20px",
      height: "20px",
      backgroundSize: "20px",
      marginRight: "24px",
      marginLeft: "-4px",
    },
  },
};

const KakaoButton: SxProps = {
  backgroundColor: "#FEE500",
  color: "rgba(0, 0, 0, 0.85)",

  ":hover": {
    backgroundColor: "#FEE500",
  },
  ":before": {
    backgroundImage: "url(/images/logo-kakao.png)",
  },
};

const NaverButton: SxProps = {
  backgroundColor: "#03C75A",
  color: "#FFFFFF",
  ":hover": {
    backgroundColor: "#03C75A",
  },
  ":before": {
    backgroundImage: "url(/images/logo-naver.png)",
  },
};

const GoogleButton: SxProps = {
  backgroundColor: "#FFFFFF",
  color: "rgba(0, 0, 0, 0.54)",
  ":hover": {
    backgroundColor: "#FFFFFF",
  },
  ":before": {
    backgroundImage: "url(/images/logo-google.svg)",
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
  const navigation = useRouter();
  const handleSignInWithGoogle = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    await signInWithGoogle();

    navigation.replace(HOME_PATH);
  };

  return (
    <Box className="LoginForm" sx={signin_wrapper}>
      <Button variant="contained" sx={KakaoButton}>
        카카오로 시작하기
      </Button>
      <Button variant="contained" sx={NaverButton}>
        네이버로 시작하기
      </Button>
      <Button variant="contained" sx={GoogleButton} onClick={handleSignInWithGoogle} component={NextLink} href="#">
        구글로 로그인하기
      </Button>
      <Button variant="contained" sx={EmailButton} component={NextLink} href={SIGNIN_EMAIL_PATH}>
        이메일로 로그인하기
      </Button>
      <div className="auth_switch_flow">
        {/* 이미 가입하셨나요? <Link href={'/signin'}>로그인하기</Link> */}
        아직 가입하지 않으셨나요?{" "}
        <Link href={SIGNUP_EMAIL_PATH} component={NextLink}>
          가입하기
        </Link>
      </div>
    </Box>
  );
}
