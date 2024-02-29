interface ILibRequest {
  authKey?: string; // 인증키, 필수, 문자열
  format?: "xml" | "json"; // 응답유형, 선택, 문자열, 없을 경우 'xml' 타입으로 제공
}
