"use server";

import { createFirebaseCustomToken, updateOrCreateUserFromKakao } from "@/lib/firebase/firebase-admin";

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

const getKakaoCustomToken = async (access_token: string) => {
  console.log("access_token : ", access_token);

  try {
    const me = await getKakaoUserProfile(access_token);
    // console.log("me : ", me);

    const body = me;
    // const userId = `kakao:${body.id}`;
    const kakaoUID = body.id.toString();
    if (!kakaoUID) {
      throw new Error("There was no user with the given access token.");
    }
    let nickname = null;
    let profileImage = null;
    if (body.properties) {
      nickname = body.properties.nickname;
      profileImage = body.properties.profile_image;
    }
    let phone_number = null;
    let is_email_verified = false;
    let email = null;
    if (body.kakao_account) {
      email = body.kakao_account.email;
      phone_number = body.kakao_account.phone_number;
      is_email_verified = body.kakao_account.is_email_verified;
    }

    const userRecord = await updateOrCreateUserFromKakao(kakaoUID, email, is_email_verified, nickname, profileImage, phone_number);
    const customToken = await createFirebaseCustomToken(userRecord.uid, { provider: "kakao" });

    return customToken;
  } catch (error) {
    throw error;
  }
};

export default getKakaoCustomToken;
