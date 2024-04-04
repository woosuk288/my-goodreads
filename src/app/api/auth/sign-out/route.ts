import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// import { APIResponse } from "@/types";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

export async function GET() {
  const sessionCookie = cookies().get("__session")?.value;

  console.log("signout sessionCookie : ", sessionCookie?.length);

  if (!sessionCookie) return NextResponse.json({ success: false, error: "Session not found." }, { status: 400 });

  cookies().delete("__session");

  await revokeAllSessions(sessionCookie);

  return NextResponse.json({ success: true, data: "Signed out successfully." });
}
