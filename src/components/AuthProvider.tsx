"use client";

import { auth } from "@/lib/firebase/firebase";
import { AuthState } from "@/types/exportType";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// | { state: "loading" }
// | { state: "loaded"; isAuthentication: true; user: User }
// | { state: "loaded"; isAuthentication: false; user: null }
// | { state: "error"; error: Error };

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ state: "loading", isLoggedIn: false });

  const onChange = (user: User | null) => {
    if (user) {
      setAuthState({ state: "loaded", isLoggedIn: true, user });
    } else {
      setAuthState({ state: "loaded", isLoggedIn: false, user });
    }
  };
  const setError = (error: Error) => setAuthState({ ...authState, state: "error", error });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onChange, setError);
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const authState = useContext(AuthContext);
  if (!authState) throw new Error("AuthProvider not found");
  return authState;
};
