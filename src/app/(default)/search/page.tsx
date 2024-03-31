import React from "react";

import SearchBookList from "../../../components/SearchBookList";
import SignUpBanner from "../../../components/SignUpBanner";
import { getKakaoBooks } from "@/actions/getKakaoBooks";
import ReadStatusDrawer from "@/components/ReadStatusDrawer";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: ISearchParams, parent: ResolvingMetadata): Promise<Metadata> {
  // fetch data
  const kakaoBooksResult = await getKakaoBooks({ query: searchParams.query });
  const kakaoMeta = kakaoBooksResult.meta;
  const thumbnailImages = kakaoBooksResult.documents.map((doc) => doc.thumbnail);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Search results for "${searchParams.query}" (showing 1-${kakaoMeta.pageable_count} of ${kakaoMeta.total_count} books) | Goodreads`,
    openGraph: {
      images: [...thumbnailImages, ...previousImages],
    },
  };
}

interface ISearchParams {
  searchParams: {
    query: string;
  };
}
export default async function Page({ searchParams }: ISearchParams) {
  const kakaoBooksResult = await getKakaoBooks({ query: searchParams.query });

  return (
    <React.Fragment>
      <SignUpBanner />
      <SearchBookList query={searchParams.query} kakaoBooksResult={kakaoBooksResult} />
      <ReadStatusDrawer />
    </React.Fragment>
  );
}
