"use client";

import { Avatar, Box, Button, Divider, List, ListItemButton, ListItemText, SxProps, Typography, styled } from "@mui/material";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import NextLink from "next/link";
import { ChangeEvent, useState, useTransition } from "react";
import useSWR from "swr";

import { deleteFileFromPath, uploadProfilePhoto } from "@/lib/firebase/storage";
import { getProfile, updateProfileInfo } from "@/lib/firebase/firestore";
import { API_PROFILE, LOGIN_PATH } from "@/constants/routes";
import LoadingProgress from "@/components/LoadingProgress";
// import useSWRMutation from "swr/mutation";
import { useAuth } from "@/components/AuthProvider";
import { redirect } from "next/navigation";
import ProfileEditDrawer from "./ProfileEditDrawer";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ProfileEditMain() {
  const [dataPhotoURL, setDataPhotoURL] = useState<string>();

  const { state, user } = useAuth();

  const { data: profileData, mutate, isLoading } = useSWR(user ? API_PROFILE : null, getProfile);
  const [isPending, startTransition] = useTransition();

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        // setImageSrc(reader.result);
        console.log(reader.result);
        if (typeof reader.result === "string" || typeof reader.result === "undefined") {
          setDataPhotoURL(reader.result);
        }

        resolve(reader.result);
      };
    });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      encodeFileToBase64(e.target.files[0]);
    }
  };

  const handlePhotoCancel = () => {
    setDataPhotoURL(undefined);
  };

  const handlePhotoSave = async () => {
    if (dataPhotoURL && profileData) {
      startTransition(async () => {
        const url = await uploadProfilePhoto(dataPhotoURL);
        await updateProfileInfo("photoURL", url);
        mutate({ ...profileData, photoURL: url });
        setDataPhotoURL(undefined);
      });

      // router.refresh
    }
  };

  const handlePhotoDelete = async () => {
    const deletePhotoURL = profileData?.photoURL;

    if (!deletePhotoURL || !deletePhotoURL?.startsWith("https://") || !deletePhotoURL.includes(".appspot.com/o/")) {
      throw new Error("Wrong URL!");
    }
    if (confirm("Are you sure you want to delete your profile photo?")) {
      console.log("go delete");
      startTransition(async () => {
        await deleteFileFromPath(deletePhotoURL);
        await updateProfileInfo("photoURL", "");
        setDataPhotoURL(undefined);
        mutate({ ...profileData, photoURL: "" });
      });
    }
  };

  if (state === "loading" || isLoading) return <LoadingProgress />;
  if (!user) redirect(LOGIN_PATH);
  if (!profileData) return <div>오류: 사용자 데이터가 존재하지 않습니다!</div>;

  return (
    <Box sx={sxProfileEditMain}>
      <div className="profile_header_section">
        <Typography component="h1" fontSize={"1.25rem"} fontWeight={500}>
          프로필
        </Typography>
      </div>
      <div className="profile_photo_section">
        <div className="photo_wrapper">
          {/* <img src="" alt="" /> */}
          <Avatar sx={{ width: 72, height: 72 }} src={dataPhotoURL || profileData?.photoURL}>
            <LocalLibraryIcon fontSize="large" />
          </Avatar>
        </div>

        {!dataPhotoURL && profileData?.photoURL.startsWith("https://") ? (
          <div className="btns_edit">
            <Button disabled={isPending} color="secondary" onClick={handlePhotoDelete}>
              삭제하기
            </Button>

            <Button
              disabled={isPending}
              component="label"
              role={undefined}
              // variant="contained"
              tabIndex={-1}
              color="secondary"
            >
              수정하기
              <VisuallyHiddenInput type="file" onChange={handlePhotoChange} accept=".jpg, .jpeg, .png" />
            </Button>
          </div>
        ) : dataPhotoURL?.startsWith("data:") ? (
          <div className="btns_edit">
            <Button disabled={isPending} sx={{ color: "#999999" }} onClick={handlePhotoCancel}>
              취소하기
            </Button>
            <Button disabled={isPending} color="secondary" onClick={handlePhotoSave}>
              저장하기
            </Button>
          </div>
        ) : (
          <div className="btn_photo_upload_wrapper">
            <Button
              disabled={isPending}
              component="label"
              role={undefined}
              // variant="contained"
              tabIndex={-1}
              color="secondary"
            >
              사진 업로드
              <VisuallyHiddenInput type="file" onChange={handlePhotoChange} accept=".jpg, .jpeg, .png" />
            </Button>
          </div>
        )}
      </div>

      <div className="profile_list_section">
        <List>
          <Divider />
          <ListItemButton component={NextLink} href="?profile-info-drawer=true&edit=displayName">
            <ListItemText primary="닉네임" secondary={profileData?.displayName || "아직 없어요~"} />
            <NavigateNextIcon />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="이메일" secondary={user.email} />
            {/* <NavigateNextIcon /> */}
          </ListItemButton>
          <Divider />
        </List>
      </div>

      <ProfileEditDrawer profile={profileData} />
    </Box>
  );
}
export default ProfileEditMain;

const sxProfileEditMain: SxProps = {
  ".profile_header_section": {
    padding: "12px",
  },
  ".profile_photo_section": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "primary.light",
    padding: "24px 0 16px",

    ".photo_wrapper": {
      marginBottom: "12px",
    },

    ".btns_edit": {
      display: "flex",
      gap: "48px",
    },
  },
};
