"use client";

import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Home from "@/component/Home";
import Main from "@/component/Main";

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.

interface Props {
  recentPosts: Array<{
    id: string;
    title: string;
  }>;
}
export default function HomePage({ recentPosts }: Props) {
  return (
    <>
      <Header />

      <Main>
        <Home />
      </Main>

      <Footer />
    </>
  );
}
