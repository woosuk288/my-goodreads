interface KakaoProperties {
  nickname: string;
  profile_image: string;
}

interface KakaoAccount {
  email: string;
  phone_number: string;
  is_email_verified: boolean;
}

interface IKakaoProfile {
  id: number;
  properties?: KakaoProperties;
  kakao_account?: KakaoAccount;
}
