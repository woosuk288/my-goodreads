"use client";

import { signInWithKakao } from "@/lib/firebase/auth";
import { LinearProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function KakaoLoginRedirect() {
  let didInit = false;
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ app 로드시 한번만 실행된다.
      signInWithKakao(searchParams.get("code") as string).catch((error) => {
        console.log(error);
        alert("로그인 처리 중 오류가 발생했습니다.");
        router.back();
      });
    }
  }, []);

  return <LinearProgress />;
}
export default KakaoLoginRedirect;
