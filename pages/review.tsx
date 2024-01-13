import Editor from "../src/component/Editor";
import Footer from "../src/component/Footer";
import Header from "../src/component/Header";
import Main from "../src/component/Main";

// 리뷰 작성 및 수정
export default function ReviewPage() {
  return (
    <>
      <Header />
      <Main>
        <Editor />
      </Main>
      <Footer />
    </>
  )
}