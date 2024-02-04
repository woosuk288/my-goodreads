import "server-only";

import { credential } from "firebase-admin";
import { initializeApp as initializeAdminApp, getApps as getAdminApps } from "firebase-admin/app";
import { SessionCookieOptions, getAuth as getAdminAuth } from "firebase-admin/auth";

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

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return adminAuth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  return await adminAuth.revokeRefreshTokens(decodedIdToken.sub);
}
