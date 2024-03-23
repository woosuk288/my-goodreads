import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import LoadingProgress from "@/components/LoadingProgress";

export const metadata = {
  title: "로그인",
  description: "카카오, 네이버, 이메일 로그인",
};

export const dynamic = "force-dynamic";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <React.Suspense fallback={<LoadingProgress circularProgressProps={{ color: "primary" }} />}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
