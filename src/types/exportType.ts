import { User } from "firebase/auth";

export type AuthState = {
  state: "loading" | "loaded" | "error";
  isLoggedIn: boolean;
  user?: User | null;
  error?: Error;
};
