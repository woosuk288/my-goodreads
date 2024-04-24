import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// import { APIResponse } from "@/types";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

export async function GET() {
  return NextResponse.json({ success: true, data: "Signed out successfully." });
}
