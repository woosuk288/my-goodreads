import Footer from "../../../component/Footer";
import Header from "../../../component/Header";
import Main from "../../../component/Main";

import SearchList from "../../../component/SearchList";
import SignUpBanner from "../../../component/SignUpBanner";

export default function Page() {
  return (
    <>
      <Header />
      <Main>
        <SignUpBanner />
        <SearchList />
      </Main>
      <Footer />
    </>
  );
}
