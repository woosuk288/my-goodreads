"use client";

import NextLink from "next/link";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { HOME_PATH, SIGNIN_EMAIL_PATH } from "../../../constants/routes";
import { useState } from "react";

const sxLogoSection: SxProps = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
  padding: "16px",
  img: {
    width: "205px",
  },
};

const sxFormSection: SxProps = {
  padding: "16px",
  ".MuiTextField-root": {
    width: "100%",
    marginTop: "8px",
    marginBottom: "4px",
    ".MuiInputBase-root": {},
    ".MuiInputBase-input": {
      padding: "8.5px 14px",
    },

    fieldset: { borderRadius: "24px" },
  },
  ".password_info_wrapper": {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    marginTop: "8px",
    ".MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: "text.secondary",
    },
    ".MuiTypography-root": {
      color: "text.secondary",
      lineHeight: 1,
    },
  },
  ".checkbox_wrapper": {
    marginBlock: "12px",
    marginBottom: "24px",
  },

  ".legal_text_wrapper": {
    marginTop: "16px",
    marginBottom: "12px",
    a: {
      color: "#1E1915",
      textDecoration: "underline",
    },
  },
};

const sxFooterSection: SxProps = {
  marginTop: "32px",
  marginBottom: "32px",
  ".terms_wrapper": {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "8px",
    a: {
      color: "primary.dark",
    },
  },
};

interface Props {}

export default function SignUpEmailPage({}: Props) {
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    displayName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = (name: keyof IUserCredentials) => () => {
    if (userCredentials[name]) {
      setUserCredentials({
        ...userCredentials,
        [name]: "",
      });
    }
  };

  const textFiledClearIcon = (name: keyof IUserCredentials) =>
    userCredentials[name]
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={handleCancel(name)}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }
      : undefined;

  return (
    <Box className="SignUpEmail">
      <Box sx={sxLogoSection}>
        <Link component={NextLink} href={HOME_PATH}>
          <img src="/images/logo-goodreads.svg" alt="Goodreads" />
        </Link>
      </Box>

      <Box sx={sxFormSection} component="form">
        <Typography component="h1" fontSize="1.5rem" fontWeight={600} gutterBottom textAlign="center">
          이메일 가입
        </Typography>
        {/* <Button component={Link} href={SIGNIN_  PATH}>비밀번호를 잃어버렸나요?</Button> */}

        <TextField
          type="text"
          name="displayName"
          placeholder="이름 or 별명"
          InputProps={textFiledClearIcon("displayName")}
          value={userCredentials.displayName}
          onChange={handleChange}
        ></TextField>
        <TextField
          type="email"
          name="email"
          placeholder="이메일 주소"
          InputProps={textFiledClearIcon("email")}
          value={userCredentials.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="password"
          placeholder="비밀번호"
          InputProps={textFiledClearIcon("password")}
          value={userCredentials.password}
          onChange={handleChange}
        />

        <div className="password_info_wrapper">
          <InfoOutlinedIcon />
          <Typography>비밀번호는 최소 6자 이상이어야 합니다.</Typography>
        </div>

        <div className="checkbox_wrapper">
          <FormControlLabel label="비밀번호 보이기" control={<Checkbox checked={false} onChange={handleChange} />} />
        </div>

        <div className="submit_wrapper">
          <Button variant="contained" fullWidth sx={{ padding: "8px 16px", borderRadius: "24px", bgcolor: "primary.dark" }}>
            생성하기
          </Button>
        </div>

        <div className="legal_text_wrapper">
          <Typography>
            By creating an account, you agree to the Goodreads{" "}
            <Link component={NextLink} href="https://www.goodreads.com/about/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link component={NextLink} href="https://www.goodreads.com/about/privacy">
              Privacy Policy
            </Link>
          </Typography>
        </div>

        <Divider sx={{ marginBottom: "12px", ":before, :after": { borderColor: (theme) => theme.palette.secondary.main, opacity: 0.5 } }}>
          <Typography align="center">이미 계정이 있으신가요?</Typography>
        </Divider>

        <Button variant="outlined" fullWidth sx={{ padding: "7px 15px", borderRadius: "24px" }} component={Link} href={SIGNIN_EMAIL_PATH}>
          바로 시작하기
        </Button>
      </Box>

      <Box component="footer" sx={sxFooterSection}>
        <div className="terms_wrapper">
          <Link component={NextLink} href="/about/terms">
            서비스 약관
          </Link>
          <Link component={NextLink} href="/about/privacy">
            개인 정보 보호
          </Link>
          <Link component={NextLink} href="/help">
            도움말
          </Link>
        </div>

        <Typography variant="body2" align="center">
          © 2023 Goodreads, Inc.
        </Typography>
      </Box>
    </Box>
  );
}
