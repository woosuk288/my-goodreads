import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// import { APIResponse } from "@/types";
import { createSessionCookie } from "@/src/lib/firebase/firebase-admin";

export async function POST(request) {
  const reqBody = (await request.json());
  console.log('reqBody : ',reqBody)
  const idToken = reqBody.idToken;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await createSessionCookie(idToken, { expiresIn });

  cookies().set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

  return NextResponse.json({ success: true, data: "Signed in successfully." });
}