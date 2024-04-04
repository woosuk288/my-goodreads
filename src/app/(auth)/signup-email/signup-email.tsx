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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { API_PROFILE, HOME_PATH, SIGNIN_EMAIL_PATH } from "../../../constants/routes";

import { signUpWithEmail } from "@/lib/firebase/auth";
import { sxFooterSection, sxFormSection, sxLogoSection } from "../signin-email/signin-email";

interface Props {}

const defaultUserCredential = {
  displayName: "",
  email: "",
  password: "",
};
export default function SignUpEmailPage({}: Props) {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>(defaultUserCredential);
  const { email, password, displayName } = userCredentials;

  const [checkboxes, setCheckboxes] = useState({
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  const { trigger: submitTrigger, isMutating } = useSWRMutation(API_PROFILE, () => signUpWithEmail(email, password, displayName), {
    onError(err) {
      setErrorMessage(err.message);
    },
    onSuccess() {
      router.replace(HOME_PATH);
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
  const submitValidation = !!displayName && email.search(emailRegex) !== -1 && password.length > 6;

  return (
    <Box className="SignUpEmail">
      <Box sx={sxLogoSection}>
        <Link component={NextLink} href={HOME_PATH}>
          <img src="/images/logo-goodreads.svg" alt="Goodreads" />
        </Link>
      </Box>

      {errorMessage && (
        <Typography color="error" align="center" whiteSpace="pre-wrap">
          {errorMessage}
        </Typography>
      )}

      <Box sx={sxFormSection} component="form" onSubmit={handleSubmit}>
        <Typography component="h1" fontSize="1.5rem" fontWeight={600} gutterBottom textAlign="center">
          계정 생성
        </Typography>
        {/* <Button component={Link} href={SIGNIN_  PATH}>비밀번호를 잃어버렸나요?</Button> */}

        <TextField
          type="text"
          name="displayName"
          placeholder="이름 or 별명"
          InputProps={textFiledClearIcon("displayName")}
          value={userCredentials.displayName}
          onChange={handleChange}
          disabled={isMutating}
        ></TextField>
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
          placeholder="비밀번호 생성"
          autoComplete="on"
          InputProps={textFiledClearIcon("password")}
          value={userCredentials.password}
          onChange={handleChange}
          disabled={isMutating}
        />

        <div className="password_info_wrapper">
          <InfoOutlinedIcon />
          <Typography>비밀번호는 최소 6자 이상이어야 합니다.</Typography>
        </div>

        <div className="checkbox_wrapper">
          <FormControlLabel
            label="비밀번호 보이기"
            control={<Checkbox checked={checkboxes.showPassword} name="showPassword" onChange={handleCheckboxChange} />}
          />
        </div>

        <div className="submit_wrapper">
          <Button
            variant="contained"
            fullWidth
            sx={{ padding: "8px 16px", borderRadius: "24px", bgcolor: "primary.dark" }}
            disabled={!submitValidation || isMutating}
            type="submit"
          >
            {isMutating ? "생성하는 중..." : "생성하기"}
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

        <Button
          variant="outlined"
          fullWidth
          sx={{ padding: "7px 15px", borderRadius: "24px" }}
          component={Link}
          href={SIGNIN_EMAIL_PATH}
          disabled={isMutating}
        >
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
