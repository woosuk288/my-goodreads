import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  getAdditionalUserInfo,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";

import { auth } from "@/lib/firebase/firebase";
import { updateProfileInfo } from "./firestore";
import { FirebaseError } from "firebase/app";
import getKakaoCustomToken from "@/actions/getKakaoCustomToken";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithKakao(code: string) {
  if (!code) {
    throw new Error("잘못된 인증 코드 입니다.");
  }

  const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!client_id || !client_secret) {
    throw new Error("KEY를 확인하세요.");
  }

  const redirect_uri = `${window.location.origin}/oauth/kakao`;

  const params = new URLSearchParams();
  params.set("grant_type", "authorization_code");
  params.set("client_id", client_id);
  params.set("redirect_uri", redirect_uri);
  params.set("code", code);
  params.set("client_secret", client_secret);

  const payload = params.toString();

  try {
    // access token 가져오기
    const res = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    }).then((response) => response.json());

    // firebaseCustomToken 받기
    const customToken = await getKakaoCustomToken(res.access_token);
    const userCredential = await signInWithCustomToken(auth, customToken);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    const result = await response.json();
    console.log("result : ", result);

    return result;
  } catch (e) {
    console.log(e);
    throw new Error("로그인 중 오류가 발생했습니다!");
  }
}

export async function signInWithNaver() {}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const addtionalUserInfo = getAdditionalUserInfo(userCredential);

    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken, isNew: addtionalUserInfo?.isNewUser }),
    });

    const result = await response.json();
    console.log("result : ", result);

    return result;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signUpWithEmail(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const addtionalUserInfo = getAdditionalUserInfo(userCredential);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken, isNew: addtionalUserInfo?.isNewUser, displayName }),
    });

    const result = await response.json();
    console.log("result : ", result);
  } catch (error) {
    console.error("Error signing up with Email", error);

    if (error instanceof FirebaseError) {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        throw new Error("이메일이 이미 사용 중입니다.");
      }
      throw new Error("가입 중에 오류가 발생했습니다!");
    }
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    const result = await response.json();
    console.log("result : ", result);
  } catch (error) {
    console.error("Error signing up with Email", error);

    if (error instanceof FirebaseError) {
      if (error.code === AuthErrorCodes.INVALID_PASSWORD || AuthErrorCodes.USER_DELETED) {
        throw new Error(`인증 정보가 일치하지 않습니다. \n 이메일이나 비밀번호를 다시 확인해주세요.`);
      }
      throw new Error("가입 중에 오류가 발생했습니다!");
    }
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log({ signOut: result });

    return result;
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
