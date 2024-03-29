import { createFirebaseCustomToken, updateOrCreateUser } from "@/lib/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const code = reqBody.code;
  const state = reqBody.state;
  const origin = reqBody.origin;

  const accessToken = await getNaverAccessToken(code, state, origin);
  const me: INaverProfile = await getNaverUserProfile(accessToken);
  if (me.message !== "success") {
    return NextResponse.json({ success: false, message: "인증에 실패하였습니다.." }, { status: 400 });
  }

  const body = me.response;
  const providerId = body.id.toString();
  // const userId = `naver:${body.id}`;

  const userRecord = await updateOrCreateUser({
    provider: "naver",
    providerId,
    email: body.email,
    emailVerified: !!body.email,
    displayName: body.nickname,
    photoURL: body.profile_image,
    phoneNumber: body.mobile,
  });

  const customToken = await createFirebaseCustomToken(userRecord.uid, { provider: "naver" });

  return NextResponse.json({ success: true, data: { customToken } });
}

export async function getNaverAccessToken(code: string, state: string, origin: string) {
  const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  if (!client_id || !client_secret) {
    throw new Error("KEY를 확인하세요.");
  }

  const redirectURI = encodeURI(`${origin}/oauth/naver`);

  const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

  // access token 가져오기
  const res = await fetch(api_url, {
    headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
  }).then<INaverToken>((res) => res.json());

  return res.access_token;
}

// Naver API request url to retrieve user profile based on access token
const requestNaverMeUrl = "https://openapi.naver.com/v1/nid/me";

/**
 * requestMe - Returns user profile from Naver API
 *
 * @param  {String} naverAccessToken Access token retrieved by Naver Login API
 * @return {Promiise<Response>}      User profile response in a promise
 */
function getNaverUserProfile(naverAccessToken: string) {
  console.log("Requesting user profile from Naver API server.");
  return fetch(requestNaverMeUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + naverAccessToken,
    },
  }).then((res) => res.json());
}
