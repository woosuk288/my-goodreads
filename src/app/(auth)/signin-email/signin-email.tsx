"use client";

import { FormEvent, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

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

import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { API_PROFILE, HOME_PATH, SIGNUP_EMAIL_PATH } from "../../../constants/routes";

interface Props {}

const defaultUserCredential = {
  displayName: "",
  email: "",
  password: "",
};

export default function SignInEmailPage({}: Props) {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>(defaultUserCredential);
  const { email, password, displayName } = userCredentials;

  const [checkboxes, setCheckboxes] = useState({
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  const { trigger: submitTrigger, isMutating } = useSWRMutation(API_PROFILE, () => signInWithEmail(email, password), {
    onSuccess() {
      console.log("onSuccess");
      router.replace(HOME_PATH);
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    submitTrigger();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const submitValidation = email.search(emailRegex) !== -1 && password.length > 1;

  return (
    <Box className="SignInEmail">
      <Box sx={sxLogoSection}>
        <Link href={HOME_PATH} component={NextLink}>
          <img src="/images/logo-goodreads.svg" alt="Goodreads" />
        </Link>
      </Box>

      {errorMessage && (
        <Typography color="error" align="center" whiteSpace="pre-wrap">
          {errorMessage}
        </Typography>
      )}

      <Box sx={sxFormSection} component="form" onSubmit={handleSubmit}>
        <Typography component="h1" fontSize="1.5rem" fontWeight={600} gutterBottom>
          이메일 로그인
        </Typography>
        <div className="forgot_password_wrapper">
          <Link href="/forgotpassword" sx={{ textDecoration: "underline", color: "primary.dark" }} component={NextLink}>
            비밀번호를 잊었나요?
          </Link>
        </div>

        <TextField
          type="email"
          name="email"
          placeholder="이메일 주소"
          InputProps={textFiledClearIcon("email")}
          value={userCredentials.email}
          onChange={handleChange}
          disabled={isMutating}
        />
        <TextField
          type={checkboxes.showPassword ? "text" : "password"}
          name="password"
          placeholder="비밀번호"
          autoComplete="on"
          InputProps={textFiledClearIcon("password")}
          value={userCredentials.password}
          onChange={handleChange}
          disabled={isMutating}
        />

        <div className="checkbox_wrapper">
          <div className="checkbox_row">
            <FormControlLabel
              label="비밀번호 보이기"
              control={<Checkbox checked={checkboxes.showPassword} name="showPassword" onChange={handleCheckboxChange} />}
            />
          </div>
          {/* <div className="checkbox_row">
            <FormControlLabel label="로그인 유지하기" control={<Checkbox checked={false} onChange={handleChange} />} />
          </div> */}
        </div>

        <div className="submit_wrapper">
          <Button
            variant="contained"
            fullWidth
            sx={{ padding: "8px 16px", borderRadius: "24px", bgcolor: "primary.dark" }}
            disabled={!submitValidation || isMutating}
            type="submit"
          >
            {isMutating ? "로그인 중..." : "로그인"}
          </Button>
        </div>

        <div className="legal_text_wrapper">
          <Typography>
            By creating an account, you agree to the Goodreads{" "}
            <Link href="https://www.goodreads.com/about/terms" component={NextLink}>
              Terms of Service
            </Link>
            and{" "}
            <Link href="https://www.goodreads.com/about/privacy" component={NextLink}>
              Privacy Policy
            </Link>
          </Typography>
        </div>

        <Divider sx={{ marginBottom: "12px", ":before, :after": { borderColor: (theme) => theme.palette.secondary.main, opacity: 0.5 } }}>
          <Typography align="center">Goodreads가 처음이신가요?</Typography>
        </Divider>

        <Button variant="outlined" fullWidth sx={{ padding: "7px 15px", borderRadius: "24px" }} component={Link} href={SIGNUP_EMAIL_PATH}>
          가입하기
        </Button>
      </Box>

      <Box component="footer" sx={sxFooterSection}>
        <div className="terms_wrapper">
          <Link href="/about/terms" component={NextLink}>
            서비스 약관
          </Link>
          <Link href="/about/privacy" component={NextLink}>
            개인 정보 보호
          </Link>
          <Link href="/help" component={NextLink}>
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

export const sxLogoSection: SxProps = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
  padding: "16px",
  img: {
    width: "205px",
  },
};

export const sxFormSection: SxProps = {
  padding: "16px",
  ".forgot_password_wrapper": {
    marginBottom: "12px",
    textAlign: "right",
  },
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

export const sxFooterSection: SxProps = {
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
