import BookCarouselList from "../src/component/BookCarouselList";
import BookInfo from "../src/component/BookInfo";
import BookReviewList from "../src/component/BookReviewList";
import Footer from "../src/component/Footer";
import Header from "../src/component/Header";
import Main from "../src/component/Main";

export default function BookPage() {
  return (
    <>
      <Header />
      <Main>
        <BookInfo />
        <BookReviewList />
        <BookCarouselList />
      </Main>
      <Footer />
    </>
  );
}

const MOCK_BOOK_DATA = {};

const HITS = {
  documents: [
    {
      authors: ["애덤 그랜트"],
      contents:
        "주는 사람이 성공한다『Give and Take(기브앤테이크)』. 와튼스쿨 역대 최연소 종신교수이자 3년 연속 최우수강의평가상에 빛나는 세계적 조직심리학자 애덤 그랜트가 밝혀낸 성공의 숨은 동력을 제시한 책이다. 저자는 우리 사회를 지배해온 성공에 대한 고정관념, 즉 강하고 독한 자가 모든 것을 가져간다는 ‘승자 독식’의 근본 명제를 뒤집고, 성공에 있어서 대단히 중요하지만 흔히 사람들이 간과하는 ‘타인과의 상호작용’에 주목한다.  이 책은 ‘주는 것",
      datetime: "2013-06-07T00:00:00.000+09:00",
      isbn: "8962605813 9788962605815",
      price: 17500,
      publisher: "생각연구소",
      sale_price: 15750,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F869865%3Ftimestamp%3D20240114152254",
      title: "Give and Take(기브앤테이크)",
      translators: ["윤태준"],
      url: "https://search.daum.net/search?w=bookpage&bookId=869865&q=Give+and+Take%28%EA%B8%B0%EB%B8%8C%EC%95%A4%ED%85%8C%EC%9D%B4%ED%81%AC%29",
    },
    {
      authors: ["Grant Adam M"],
      contents:
        "Adam Grant shows how helping others can lead to greater personal success. He demonstrates how smart givers avoid becoming doormats, and why this kind of success has the power to transform not just individuals and groups, but entire organisations and communities",
      datetime: "2013-04-09T00:00:00.000+09:00",
      isbn: "0670026557 9780670026555",
      price: 40310,
      publisher: "Viking Books",
      sale_price: 31620,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3136699%3Ftimestamp%3D20190218010120",
      title: "Give and Take",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=3136699&q=Give+and+Take",
    },
    {
      authors: ["애덤 그랜트"],
      contents:
        "Adam Grant is the youngest tenured professor at Wharton, and an award-winning researcher and teacher. Previously, he was a record-setting salesperson, negotiator, and advertising director at Let's Go Publications; an All-American and Junior Olympic springboard diver",
      datetime: "2014-01-09T00:00:00.000+09:00",
      isbn: "1780224729 9781780224725",
      price: 16770,
      publisher: "Phoenix",
      sale_price: 11470,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3117532%3Ftimestamp%3D20230902171106",
      title: "Give and Take",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=3117532&q=Give+and+Take",
    },
    {
      authors: ["Kaufman Andrew D"],
      contents: "",
      datetime: "2015-02-10T00:00:00.000+09:00",
      isbn: "145164471X 9781451644715",
      price: 22250,
      publisher: "Simon & Schuster",
      sale_price: 16930,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3406495%3Ftimestamp%3D20190220111834",
      title: "Give War and Peace a Chance",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=3406495&q=Give+War+and+Peace+a+Chance",
    },
    {
      authors: ["Meiners Cheri J/ Johnson Meredith (ILT)"],
      contents: "",
      datetime: "2006-04-15T00:00:00.000+09:00",
      isbn: "1575422042 9781575422046",
      price: 15620,
      publisher: "Free Spirit",
      sale_price: 13260,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F2580650%3Ftimestamp%3D20230802152308",
      title: "Reach Out And Give",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=2580650&q=Reach+Out+And+Give",
    },
    {
      authors: [],
      contents: "",
      datetime: "2022-03-29T00:00:00.000+09:00",
      isbn: " 9781409195474",
      price: 27420,
      publisher: "",
      sale_price: 21790,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5920247%3Ftimestamp%3D20221108014203",
      title: "I Give It a Year",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=5920247&q=I+Give+It+a+Year",
    },
    {
      authors: ["애덤 그랜트"],
      contents:
        "and luck. But in today’s dramatically reconfigured world, success is increasingly dependent on how we interact with others. In Give and Take, Adam Grant, an award-winning researcher and Wharton’s highest-rated professor, examines the surprising forces that shape",
      datetime: "2014-03-25T00:00:00.000+09:00",
      isbn: "0143124986 9780143124986",
      price: 19500,
      publisher: "Penguin Books",
      sale_price: 14630,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3198675%3Ftimestamp%3D20240119182401",
      title: "Give and Take",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=3198675&q=Give+and+Take",
    },
    {
      authors: ["Lowrey Annie"],
      contents: "",
      datetime: "2019-07-09T00:00:00.000+09:00",
      isbn: "1524758779 9781524758776",
      price: 19170,
      publisher: "Broadway Books",
      sale_price: 17330,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4987177%3Ftimestamp%3D20230408010838",
      title: "Give People Money",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=4987177&q=Give+People+Money",
    },
    {
      authors: ["에드거 샤인"],
      contents:
        "'기업 문화의 아버지'로 인정받는 세계적 석학 에드거 샤인의 『헬핑』. 일상생활 혹은 사회생활에서 발생하는 도움 상황을 일목요연하게 분석하고 있다. 도움을 주고받는 방법에 관한 신선한 고찰이 돋보인다. 복잡하고도 미묘하게 작동되는 도움의 원리를 파헤치면서, 도움을 주는 사람과 받는 사람의 심리에 대해서도 밝히고 있다. 도움을 주는 사람과 받는 사람의 심리에 대해서도 파헤친다. 또한 제대로 된 도움을 주고받는 7가지 원칙을 공개하고 있다. 인간관계",
      datetime: "2010-02-20T00:00:00.000+09:00",
      isbn: "8993952094 9788993952094",
      price: 13900,
      publisher: "옥당",
      sale_price: 12510,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1412919%3Ftimestamp%3D20221025115304",
      title: "헬핑(양장본 HardCover)",
      translators: ["채서일"],
      url: "https://search.daum.net/search?w=bookpage&bookId=1412919&q=%ED%97%AC%ED%95%91%28%EC%96%91%EC%9E%A5%EB%B3%B8+HardCover%29",
    },
    {
      authors: ["Ghat GPT 저자 루이스 액설로드 역자"],
      contents:
        "《기브앤테이크: 비밀, 경제와 심리를 넘어서 기버의 성공》은 기부와 교환의 원리를 넘어서 사회적 성공을 이루는 기브앤테이크에 대해 다룬 책입니다. 이 책은 다양한 주제를 다루며, 기브앤테이크의 세계로, 성공하는 기버의 원칙, 수혜자의 역할, 기브앤테이크의 전략, 기브앤테이크의 실제, 도전과 기부자의 성장과 변화, 기브앤테이크의 심리학, 기브앤테이크의 공동체, 기브앤테이크의 미래, 기브앤테이크의 본질, 기브앤테이크의 마스터리, 그리고 기브앤테이크",
      datetime: "2023-07-04T00:00:00.000+09:00",
      isbn: " 9791170853077",
      price: 9900,
      publisher: "작가와",
      sale_price: -1,
      status: "정상판매",
      thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6382126",
      title: "기브앤테이크Give and Take의 비밀",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=6382126&q=%EA%B8%B0%EB%B8%8C%EC%95%A4%ED%85%8C%EC%9D%B4%ED%81%ACGive+and+Take%EC%9D%98+%EB%B9%84%EB%B0%80",
    },
  ],
  meta: {
    is_end: false,
    pageable_count: 247,
    total_count: 247,
  },
};
