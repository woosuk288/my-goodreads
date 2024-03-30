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
import { getProfilePrivacy, updateProfileInfo } from "./firestore";
import { FirebaseError } from "firebase/app";
import { mutate } from "swr";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInSocialWithCustomToken(customToken: string) {
  try {
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
      body: JSON.stringify({ idToken, isNew: addtionalUserInfo?.isNewUser, provider: "google" }),
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
      body: JSON.stringify({ idToken, isNew: addtionalUserInfo?.isNewUser, provider: "email", displayName }),
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
    // TODO: firestore client personal info check

    const privacyInfo = await getProfilePrivacy();

    if (privacyInfo?.kakaoUID) {
      // 카카오 로그아웃시 쿠키 삭제?
      document.cookie = "authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      // /api/auth/sign-out or serverAction
      await fetch("/api/auth/sign-out-kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kakaoUID: "3406645196" }),
      }).then((res) => res.json());
    }

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error signing out with Google", error);
  } finally {
    clearCache();
    // client signOut
    await auth.signOut();
  }
}

const clearCache = () => mutate(() => true, undefined, { revalidate: false });
