"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAuth } from "./AuthProvider";
import Redirect from "./Redirect";

interface Props {
  loginFlag: boolean;
  href: string;
  options?: NavigateOptions | undefined;
}

function AuthRedirect({ loginFlag, href }: Props) {
  const { state, user, isLoggedIn } = useAuth();

  if (state === "loaded" && isLoggedIn === loginFlag) {
    return <Redirect href={href} />;
  }

  return null;
}
export default AuthRedirect;
