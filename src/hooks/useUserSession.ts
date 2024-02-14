// getUser
import { onAuthStateChanged, signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import React from "react";

export default function useUserSession(initialUser: User | null | undefined = undefined) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = React.useState(initialUser);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}
