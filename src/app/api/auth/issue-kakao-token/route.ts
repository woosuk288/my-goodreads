import { createFirebaseCustomToken, updateOrCreateUser } from "@/lib/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const code = reqBody.code;
  const state = reqBody.state;
  const origin = reqBody.origin;

  const accessToken = await getKakaoAccessToken(code, state, origin);
  const me: IKakaoProfile = await getKakaoUserProfile(accessToken);
  // console.log("me : ", me);
  if (!me.id) {
    return NextResponse.json({ success: false, message: "인증에 실패하였습니다.." }, { status: 400 });
  }

  const body = me;
  const providerId = body.id.toString();
  // const userId = `kakao:${body.id}`;

  const userRecord = await updateOrCreateUser({
    provider: "kakao",
    providerId,
    email: body.kakao_account?.email,
    emailVerified: !!body.kakao_account?.email,
    displayName: body.properties?.nickname,
    photoURL: body.properties?.profile_image,
    phoneNumber: body.kakao_account?.phone_number,
  });

  const customToken = await createFirebaseCustomToken(userRecord.uid, { provider: "kakao" });

  return NextResponse.json({ success: true, data: { customToken } });
}

async function getKakaoAccessToken(code: string, state: string, origin: string) {
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
  if (!client_id || !client_secret) {
    throw new Error("KEY를 확인하세요.");
  }
  const redirectURI = encodeURI(`${origin}/oauth/kakao`);

  const params = new URLSearchParams();
  params.set("grant_type", "authorization_code");
  params.set("client_id", client_id);
  params.set("redirect_uri", redirectURI);
  params.set("code", code);
  params.set("client_secret", client_secret);

  const payload = params.toString();
  // access token 가져오기
  const res = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  }).then((response) => response.json());

  return res.access_token;
}

// Kakao API request url to retrieve user profile based on access token
const requestKakaoMeUrl = "https://kapi.kakao.com/v2/user/me?secure_resource=true";

/**
 * requestMe - Returns user profile from Kakao API
 *
 * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
 * @return {Promiise<Response>}      User profile response in a promise
 */
function getKakaoUserProfile(kakaoAccessToken: string) {
  console.log("Requesting user profile from Kakao API server.");
  return fetch(requestKakaoMeUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + kakaoAccessToken,
    },
  }).then((res) => res.json());
}
