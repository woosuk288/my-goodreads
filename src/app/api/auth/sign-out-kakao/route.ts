import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const target_id = reqBody.kakaoUID;

  if (!target_id) return NextResponse.json({ error: "There is no id." }, { status: 400 });

  const params = new URLSearchParams({
    target_id_type: "user_id",
    target_id,
  });

  const result = await fetch("https://kapi.kakao.com/v1/user/logout", {
    method: "POST",
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  }).then((res) => res.json());

  return NextResponse.json({ success: true, data: result.id });
}
