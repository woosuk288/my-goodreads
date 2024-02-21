import "server-only";

import { credential } from "firebase-admin";
import { initializeApp as initializeAdminApp, getApps as getAdminApps } from "firebase-admin/app";
import { SessionCookieOptions, getAuth as getAdminAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

const ADMIN_APP_NAME = "storyteller";
const adminApp =
  getAdminApps().find((it) => it.name === ADMIN_APP_NAME) ||
  initializeAdminApp(
    {
      credential: credential.applicationDefault(),
    },
    ADMIN_APP_NAME
  );
const adminAuth = getAdminAuth(adminApp);

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
