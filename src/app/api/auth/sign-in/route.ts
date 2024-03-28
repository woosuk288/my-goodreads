import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// import { APIResponse } from "@/types";
import { createNewProfileInfo, createSessionCookie } from "@/lib/firebase/firebase-admin";

interface Params {
  idToken: string;
  isNew: string;
  provider: string;
  displayName?: string;
}
export async function POST(request: NextRequest) {
  const reqBody: Params = await request.json();
  // console.log("reqBody : ", reqBody);
  const idToken = reqBody.idToken;
  const isNew = reqBody.isNew;
  const displayName = reqBody.displayName;
  const provider = reqBody.provider;

  if (isNew) {
    await createNewProfileInfo(idToken, provider, displayName);
  }

  const expiresIn = 60 * 60 * 3 * 1000; // 3 hour
  // const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await createSessionCookie(idToken, { expiresIn });

  cookies().set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

  return NextResponse.json({ success: true, data: "Signed in successfully." });
}
