"use client";

import { HOME_PATH } from "@/constants/routes";
import { signOut } from "@/lib/firebase/auth";
import { Box, Drawer, LinearProgress, SxProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  let didInit = false;
  const router = useRouter();
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ app 로드시 한번만 실행된다.
      signOut()
        .then(() => {
          router.replace(HOME_PATH);
        })
        .catch((error) => {
          console.log(error);
          alert("로그아웃 처리 중 오류가 발생했습니다.");
          router.back();
        });
    }
  }, []);

  return (
    <Box sx={sxLogout}>
      <LinearProgress />
    </Box>
  );
}

const sxLogout: SxProps = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: "1300",
  height: "100%",
  width: "100%",
  backgroundColor: "#FFFFFF",
};
