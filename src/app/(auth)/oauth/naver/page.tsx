import { headers } from "next/headers";
import NaverLoginRedirect from "./naver-login-redirect";

export default async function page({ searchParams }: { searchParams: { code: string; state: string } }) {
  const host = headers().get("x-forwarded-host");
  const protocol = headers().get("x-forwarded-proto");
  const origin = `${protocol}://${host}`;

  const result = await fetch(origin + "/api/auth/issue-naver-token", {
    method: "POST",
    body: JSON.stringify({ code: searchParams.code, state: searchParams.state, origin }),
  }).then((r) => r.json());

  return <NaverLoginRedirect customToken={result.data.customToken} />;
}
