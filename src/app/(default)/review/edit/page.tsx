import Editor from "@/components/Editor";

export default function page({ searchParams }: { searchParams: IKakaoBook }) {
  return <Editor kakaoBook={searchParams} />;
}
