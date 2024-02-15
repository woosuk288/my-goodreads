import { KAKAO_BOOK_SEARCH_URL } from "@/constants/urls";
import SearchBookList from "../../../components/SearchBookList";
import SignUpBanner from "../../../components/SignUpBanner";
import { getKakaoBooks } from "@/actions/getKakaoBooks";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";

export const dynamic = "force-dynamic";

interface ISearchParams {
  searchParams: {
    query: string;
  };
}
export default async function Page({ searchParams }: ISearchParams) {
  console.log("searchParams : ", searchParams);
  const { currentUser } = await getAuthenticatedAppForUser();
  const kakaoBooksResult = await getKakaoBooks({ query: searchParams.query });

  return (
    <>
      {!currentUser && <SignUpBanner />}

      <SearchBookList query={searchParams.query} kakaoBooksResult={kakaoBooksResult} />
    </>
  );
}
