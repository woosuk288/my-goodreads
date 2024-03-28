interface INaverToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}
interface INaverProfile {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname?: string;
    profile_image?: string;
    email?: string;
    name?: string;
    gender?: string;
    age: string;
    birthday?: string;
    birthyear?: string;
    mobile?: string;
  };
}
