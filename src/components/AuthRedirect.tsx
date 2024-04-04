"use client";

import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { HOME_PATH } from "@/constants/routes";

interface Props {
  // loginFlag: boolean;
  // href: string;
  // options?: NavigateOptions | undefined;
}

// (임시 방편) 로그인 후 10초가 지났는지 체크하여 비로그인 라우터 redirect
function AuthRedirect() {
  const { state, user, isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (state === "loaded" && user) {
      const isPast = user.metadata.lastSignInTime ? isPastTime(new Date(user.metadata.lastSignInTime), 10 * 1000) : false;
      console.info("isPast : ", isPast);
      if (isPast) {
        router.replace(HOME_PATH);
      }
    }
  }, [router, user]);

  return null;
}
export default AuthRedirect;

function isPastTime(lastLoginAt: Date, pastTime: number): boolean {
  // Add 30 seconds to the last login time
  let lastLoginAtPlus30s = new Date(lastLoginAt.getTime() + pastTime);

  // Get the current time
  let currentTime = new Date();

  // Check if the last login time plus 30 seconds is less than the current time
  return lastLoginAtPlus30s < currentTime;
}
