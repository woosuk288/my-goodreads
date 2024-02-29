import { getKakaoBooks } from "@/actions/getKakaoBooks";
import Editor from "@/components/Editor";

export default async function page({ params }: { params: { bookId: string } }) {
  console.log("isbn : ", params.bookId);
  const kakaoBookResponse = await getKakaoBooks({ query: params.bookId, target: "isbn", size: 1 });
  return <Editor kakaoBook={kakaoBookResponse.documents[0]} />;
}
