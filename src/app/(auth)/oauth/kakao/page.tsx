import { headers } from "next/headers";
import KakaoLoginRedirect from "./kakao-login-redirect";

export default async function page({ searchParams }: { searchParams: { code: string } }) {
  const host = headers().get("x-forwarded-host");
  const protocol = headers().get("x-forwarded-proto");
  const origin = `${protocol}://${host}`;

  const result = await fetch(origin + "/api/auth/issue-kakao-token", {
    method: "POST",
    body: JSON.stringify({ code: searchParams.code, origin }),
  }).then((r) => r.json());

  return <KakaoLoginRedirect customToken={result.data.customToken} />;
}
