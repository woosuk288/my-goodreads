import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  getAdditionalUserInfo,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
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

    // await updateProfileInfo("displayName", displayName);

    const result = await response.json();
    console.log("result : ", result);
  } catch (error) {
    console.error("Error signing up with Email", error);

    if (error instanceof FirebaseError) {
      throw new Error(error.code);
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
