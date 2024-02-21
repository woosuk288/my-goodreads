import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthState =
  | { state: "loading" }
  | { state: "loaded"; isAuthentication: true; user: User }
  | { state: "loaded"; isAuthentication: false; user: null }
  | { state: "error"; error: Error };

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ state: "loading" });

  const onChange = (user: User | null) => {
    if (user) {
      setAuthState({ state: "loaded", isAuthentication: true, user });
    } else {
      setAuthState({ state: "loaded", isAuthentication: false, user });
    }
  };
  const setError = (error: Error) => setAuthState({ state: "error", error });

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
