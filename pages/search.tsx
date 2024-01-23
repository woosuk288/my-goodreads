import Footer from "../src/component/Footer";
import Header from "../src/component/Header";
import Main from "../src/component/Main";

import SearchList from "../src/component/SearchList";
import SignUpBanner from "../src/component/SignUpBanner";

export default function SearchPage() {
  return (
    <>
      <Header />
      <Main>
        <SignUpBanner />
        <SearchList />
      </Main>
      <Footer />
    </>
  )
}