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
} from "firebase/auth";

import { auth } from "@/lib/firebase/firebase";
import { updateProfileInfo } from "./firestore";
import { FirebaseError } from "firebase/app";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
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
