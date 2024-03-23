import "server-only";

import { cookies } from "next/headers";

import { credential } from "firebase-admin";
import { initializeApp as initializeAdminApp, getApps as getAdminApps } from "firebase-admin/app";
import { SessionCookieOptions, getAuth as getAdminAuth } from "firebase-admin/auth";

import { Timestamp, getFirestore as getAdminFirestore } from "firebase-admin/firestore";

const ADMIN_APP_NAME = "storyteller";
const adminApp =
  getAdminApps().find((it) => it.name === ADMIN_APP_NAME) ||
  initializeAdminApp(
    {
      credential: credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // replace `\` and `n` character pairs w/ single `\n` character
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
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
export async function createNewProfileInfo(idToken: string) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const userInfo = await adminAuth.getUser(decodedToken.uid);

  const USERS = "users";
  const PRIVACIES = "privacies";
  const userRef = adminFirestore.collection(USERS).doc(decodedToken.uid);
  const userPrivacyRef = adminFirestore.collection(USERS).doc(decodedToken.uid).collection(PRIVACIES).doc("pesonal_info");
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    const batch = adminFirestore.batch();

    const now = Timestamp.now();
    batch.set(userRef, {
      displayName: userInfo.displayName,
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
