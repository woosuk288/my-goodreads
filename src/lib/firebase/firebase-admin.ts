import "server-only";

import { cookies } from "next/headers";

import { credential } from "firebase-admin";
import { initializeApp as initializeAdminApp, getApps as getAdminApps } from "firebase-admin/app";
import { CreateRequest, SessionCookieOptions, getAuth as getAdminAuth } from "firebase-admin/auth";

import { Timestamp, getFirestore as getAdminFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../../../service_account.json");

const ADMIN_APP_NAME = "storyteller";
const adminApp =
  getAdminApps().find((it) => it.name === ADMIN_APP_NAME) ||
  initializeAdminApp(
    {
      credential: credential.cert(serviceAccount),
    },
    ADMIN_APP_NAME
  );
const adminAuth = getAdminAuth(adminApp);
const adminFirestore = getAdminFirestore(adminApp);

export async function isUserAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await adminAuth.verifySessionCookie(_session, true));
    console.log("isRevoked : ", isRevoked);
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session!);
  const currentUser = await adminAuth.getUser(decodedIdToken.uid);

  return currentUser;
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return adminAuth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  return await adminAuth.revokeRefreshTokens(decodedIdToken.sub);
}

/**
 * 신규 회원 가입 시 기본 정보 DB 생성해 주기
 */
const KAKAO = "kakao";
const USERS = "users";
const PRIVACIES = "privacies";
const PERSONAL_INFO = "personal_info";

export async function createNewProfileInfo(idToken: string, displayName?: string) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const userInfo = await adminAuth.getUser(decodedToken.uid);

  const userRef = adminFirestore.collection(USERS).doc(decodedToken.uid);
  const userPrivacyRef = adminFirestore.collection(USERS).doc(decodedToken.uid).collection(PRIVACIES).doc(PERSONAL_INFO);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    const batch = adminFirestore.batch();

    const now = Timestamp.now();
    batch.set(userRef, {
      displayName: displayName ?? userInfo.displayName ?? "",
      photoURL: "",
      booksWant: [],
      booksReading: [],
      booksRead: [],
      reviews: [],
      createdAt: now,
      updatedAt: now,
    });
    batch.set(userPrivacyRef, { email: userInfo.email });
    await batch.commit();
  }
}

/**
 * updateOrCreateUser - Update Firebase user with the give email, create if
 * none exists.
 *
 * @param  {String} kakaoUID        user id per app
 * @param  {String} email         user's email address
 * @param  {String} displayName   user
 * @param  {String} photoURL      profile photo url
 * @return {Prommise<UserRecord>} Firebase user record in a promise
 */
export async function updateOrCreateUserFromKakao(
  kakaoUID: string,
  email: string,
  emailVerified: boolean,
  displayName: string,
  photoURL: string,
  phoneNumber: string
) {
  try {
    const q = await adminFirestore
      .collectionGroup(PRIVACIES)
      .where("provider", "==", KAKAO)
      .where("kakaoUID", "==", kakaoUID)
      .limit(1)
      .get();

    const createParams: CreateRequest = {
      displayName,
      photoURL,
    };

    if (email) {
      createParams["email"] = email;
    }
    if (emailVerified) {
      createParams["emailVerified"] = emailVerified;
    }
    if (phoneNumber) {
      createParams["phoneNumber"] = phoneNumber;
    }

    if (q.size) {
      // console.log("updating user...");

      const uid = q.docs[0].data().uid;

      // const userRecord = await adminAuth.updateUser(uid, {
      //   email,
      //   phoneNumber,
      //   // providerToLink: createParams.providerToLink,
      // });

      const userRecord = await adminAuth.getUser(uid);

      return userRecord;
    } else {
      console.log("creating user...");

      // createParams.providerToLink = {
      //   ...createParams,
      //   providerId: KAKAO,
      // };

      const userRecord = await adminAuth.createUser(createParams);

      const batch = adminFirestore.batch();
      const userRef = adminFirestore.collection(USERS).doc(userRecord.uid);
      const userPrivacyRef = adminFirestore.collection(USERS).doc(userRecord.uid).collection(PRIVACIES).doc(PERSONAL_INFO);

      const now = Timestamp.now();
      batch.set(userRef, {
        displayName: displayName ?? "",
        photoURL: photoURL ?? "",
        booksWant: [],
        booksReading: [],
        booksRead: [],
        reviews: [],
        createdAt: now,
        updatedAt: now,
      });
      batch.set(userPrivacyRef, {
        uid: userRecord.uid,
        email,
        ...(phoneNumber && { phoneNumber }),
        provider: KAKAO,
        kakaoUID,
      });
      await batch.commit();

      return userRecord;
    }
  } catch (error) {
    console.log(error);

    throw new Error("계정 생성 중 오류가 발생했습니다!");
  }
}

export async function createFirebaseCustomToken(uid: string, developerClaims?: object | undefined) {
  return adminAuth.createCustomToken(uid, developerClaims);
}
