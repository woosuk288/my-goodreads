import { KAKAO_BOOK_SEARCH_URL } from "@/constants/urls";
import SearchBookList from "../../../components/SearchBookList";
import SignUpBanner from "../../../components/SignUpBanner";
import { getKakaoBooks } from "@/actions/getKakaoBooks";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import { getProfile } from "@/lib/firebase/firestore";

export const dynamic = "force-dynamic";

interface ISearchParams {
  searchParams: {
    query: string;
  };
}
export default async function Page({ searchParams }: ISearchParams) {
  const kakaoBooksResult = await getKakaoBooks({ query: searchParams.query });

  return (
    <>
      <SignUpBanner />
      <SearchBookList query={searchParams.query} kakaoBooksResult={kakaoBooksResult} />
    </>
  );
}
