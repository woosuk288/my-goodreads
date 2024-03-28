"use server";

import { createFirebaseCustomToken /* updateOrCreateUserFromNaver */, updateOrCreateUserFromNaver } from "@/lib/firebase/firebase-admin";

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

const getNaverCustomToken = async (access_token: string) => {
  console.log("access_token : ", access_token);

  try {
    const me: INaverProfile = await getNaverUserProfile(access_token);
    // console.log("me : ", me);

    const body = me.response;
    // const userId = `naver:${body.id}`;
    const naverUID = body.id.toString();
    if (!naverUID) {
      throw new Error("There was no user with the given access token.");
    }
    // let nickname = null;
    // let profileImage = null;
    // if (body.properties) {
    //   nickname = body.properties.nickname;
    //   profileImage = body.properties.profile_image;
    // }
    // let phone_number = null;
    // let is_email_verified = false;
    // let email = null;
    // if (body.naver_account) {
    //   email = body.naver_account.email;
    //   phone_number = body.naver_account.phone_number;
    //   is_email_verified = body.naver_account.is_email_verified;
    // }

    const userRecord = await updateOrCreateUserFromNaver({
      provider: "naver",
      providerId: body.id,
      email: body.email,
      emailVerified: !!body.email,
      displayName: body.nickname,
      photoURL: body.profile_image,
      phoneNumber: body.mobile,
    });
    const customToken = await createFirebaseCustomToken(userRecord.uid, { provider: "naver" });

    return customToken;
  } catch (error) {
    throw error;
  }
};

export default getNaverCustomToken;
