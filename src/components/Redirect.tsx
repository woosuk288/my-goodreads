"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  href: string;
  options?: NavigateOptions | undefined;
}

function Redirect({ href }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href]);

  return null;
}
export default Redirect;
