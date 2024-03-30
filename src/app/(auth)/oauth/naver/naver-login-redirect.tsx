"use client";

import { signInSocialWithCustomToken } from "@/lib/firebase/auth";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  customToken: string;
}
function NaverLoginRedirect({ customToken }: Props) {
  let didInit = false;
  const router = useRouter();
  useEffect(() => {
    if (!customToken) {
      alert("로그인 처리 중 서버에서 오류가 발생했습니다.");
      router.back();
    } else if (!didInit) {
      didInit = true;
      // ✅ app 로드시 한번만 실행된다.
      signInSocialWithCustomToken(customToken).catch((error) => {
        console.log(error);
        alert("로그인 처리 중 오류가 발생했습니다.");
        router.back();
      });
    }
  }, []);

  return <LinearProgress />;
}
export default NaverLoginRedirect;
