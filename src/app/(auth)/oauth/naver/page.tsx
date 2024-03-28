import getNaverCustomToken from "@/actions/getNaverCustomToken";
import { headers } from "next/headers";
import NaverLoginRedirect from "./naver-login-redirect";

async function naverLoginCallback(code: string, state: string) {
  const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  if (!client_id || !client_secret) {
    throw new Error("KEY를 확인하세요.");
  }
  // console.log("searchParams : ", searchParams);
  // const headersList = headers();
  // const referer = headersList.get("referer");
  // for (const pair of headersList.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  // console.log("referer :", referer);
  const headersList = headers();
  const host = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const redirectURI = encodeURI(`${protocol}://${host}/oauth/naver`);

  const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

  // access token 가져오기
  const res = await fetch(api_url, {
    headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
  }).then<INaverToken>((res) => res.json());

  return res.access_token;
}

async function signInWithNaver(code: string, state: string) {
  try {
    const access_token = await naverLoginCallback(code, state);
    // firebaseCustomToken 받기
    const customToken = await getNaverCustomToken(access_token);
    return customToken;
  } catch (error) {
    throw new Error("네이버로 로그인 중 오류 발생!");
  }
}

export default async function page({ searchParams }: { searchParams: { code: string; state: string } }) {
  const customToken = await signInWithNaver(searchParams.code, searchParams.state);

  return <NaverLoginRedirect customToken={customToken} />;
}
