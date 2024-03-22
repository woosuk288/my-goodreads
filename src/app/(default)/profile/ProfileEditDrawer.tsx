"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { AppBar, Button, Container, Drawer, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import useSWRMutation from "swr/mutation";
import { API_PROFILE } from "@/constants/routes";
import { updateProfileInfo } from "@/lib/firebase/firestore";

const ANCHOR = "right";

interface Props {
  profile: IUser;
}
function ProfileEditDrawer({ profile }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { trigger: updateProfileTrigger, isMutating } = useSWRMutation(
    API_PROFILE,
    (_, { arg: { profileKey, profileValue } }: { arg: { profileKey: string; profileValue: string } }) =>
      updateProfileInfo(profileKey, profileValue),
    {
      onSuccess() {
        router.back();
      },
    }
  );

  useEffect(() => {
    const openParam = searchParams.get("profile-info-drawer");
    if (openParam) {
      handleDrawerOpen();
    } else {
      setOpen(false);
    }
  }, [searchParams]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    router.back();
  };

  const handleNicknameSubmit = (submitValue: string) => {
    updateProfileTrigger({ profileKey: "displayName", profileValue: submitValue });
  };

  const editParamValue = searchParams.get("edit");
  const titleText = editParamValue ? editParamText[editParamValue as keyof typeof editParamText] : "";

  return (
    <div>
      <Drawer
        anchor={ANCHOR}
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: (theme) => theme.breakpoints.values.sm,
            paddingLeft: "8px",
            paddingRight: "8px",
            left: 0,
            right: 0,
            margin: "0 auto",
          },
        }}
      >
        <AppBar position="absolute" sx={{ backgroundColor: "primary.light" }}>
          <Toolbar variant="dense">
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
            <Typography component="h2" variant="h6" color="primary.dark">
              {titleText}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container sx={{ paddingTop: "56px" }}>
          <ProfileNickname defaultValue={profile.displayName} onSubmit={handleNicknameSubmit} isMutating={isMutating} />
        </Container>
      </Drawer>
    </div>
  );
}

export default ProfileEditDrawer;

const editParamText = {
  displayName: "닉네임",
  email: "이메일",
};

// TODO: component로 추출?

interface ProfileNicknameProps {
  defaultValue?: string;
  maxLength?: number;
  onSubmit: (submitValue: string) => void;
  isMutating: boolean;
}
function ProfileNickname({ defaultValue = "", maxLength = 20, onSubmit, isMutating }: ProfileNicknameProps) {
  const [value, setValue] = useState(defaultValue);

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.slice(0, 20));
  };

  const handleCancel = () => {
    setValue("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="subtitle1" sx={{ margin: "24px 0" }}>
        계정 프로필을 설정해 주세요.
      </Typography>
      {/* <Typography variant="subtitle2">닉네임</Typography> */}
      <TextField
        label="닉네임"
        variant="standard"
        autoFocus
        fullWidth
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <>
              {isFocused && value && (
                <InputAdornment position="end">
                  <IconButton onClick={handleCancel}>
                    <CancelIcon color="disabled" />
                  </IconButton>
                </InputAdornment>
              )}

              <Typography variant="body2">
                {value.length}/{maxLength}
              </Typography>
            </>
          ),
        }}
        disabled={isMutating}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Button fullWidth variant="contained" sx={{ marginTop: "24px" }} disabled={!value || isMutating} type="submit">
        확인
      </Button>
    </form>
  );
}
