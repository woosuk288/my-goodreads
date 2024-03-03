import { notFound } from "next/navigation";
import { getProfileById } from "@/lib/firebase/firestore";
import ReviewList from "./review-list";
import ReviewBookList from "./review-book-list";
import { SWRConfig } from "swr";
import { API_PROFILE } from "@/constants/routes";
import { SWRProvider } from "@/components/SWRProvider";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }: { params: { userId: string }; searchParams: { shelf: IBookReadStatus } }) {
  const profile = await getProfileById(params.userId);

  if (!profile) notFound();

  const fallback = { [API_PROFILE]: profile };

  return (
    <SWRProvider value={{ fallback }}>
      {searchParams.shelf ? (
        <ReviewBookList uid={params.userId} readStatus={searchParams.shelf} profile={profile} />
      ) : (
        <ReviewList uid={params.userId} profile={profile} />
      )}
    </SWRProvider>
  );
}
