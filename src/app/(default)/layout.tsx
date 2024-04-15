import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import BottomNavbar from "@/components/BottomNavbar";
//
// import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
// import { User } from "firebase/auth";
// import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { AuthProvider } from "@/components/AuthProvider";
import HeaderNavDrawer from "@/components/HeaderNavDrawer";

// export const dynamic = "force-dynamic";

export const metadata = {
  title: "Goodreads clone",
  description: "Goodreads clone is a book review website built with Next.js and Firebase.",
  icons: {
    icon: "/images/goodreads-clone-logo-gpt-140.jpg",
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  // const { currentUser } = await getAuthenticatedAppForUser();
  // const currentUser = await getCurrentUser();
  // console.log("currentUser : ", currentUser);
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AuthProvider>
              <Header /* initialUser={currentUser?.toJSON() as User | undefined | null} */ />
              <HeaderNavDrawer />
              <BottomNavbar />
              <Main>{props.children}</Main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
