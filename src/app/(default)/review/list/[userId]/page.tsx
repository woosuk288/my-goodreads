import { notFound } from "next/navigation";
import { getProfileById } from "@/lib/firebase/firestore";
import ReviewListMain from "./review-list-main";
import ReviewBookList from "./review-book-list";
import { API_PROFILE } from "@/constants/routes";
import { SWRProvider } from "@/components/SWRProvider";
import ReadStatusDrawer from "@/components/ReadStatusDrawer";
import { Metadata, ResolvingMetadata } from "next";

// CSR

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // fetch data
  const profile = await getProfileById(params.userId);
  const bookCount = (profile?.booksRead?.length ?? 0) + (profile?.booksReading?.length ?? 0) + (profile?.booksWant?.length ?? 0);

  return {
    title: `${profile?.displayName}’s books on Goodreads (${bookCount} books)`,
    openGraph: {
      description: `${profile?.displayName} has ${bookCount} books on their all shelf: ${profile?.booksWant?.length}want, ${profile?.booksReading?.length}reading, ${profile?.booksRead?.length}read`,
    },
  };
}

interface Props {
  params: { userId: string };
  searchParams: { shelf: IBookReadStatus };
}

export default async function page({ params, searchParams }: Props) {
  const profile = await getProfileById(params.userId);

  if (!profile) notFound();

  const fallback = { [API_PROFILE]: profile };

  return (
    <SWRProvider value={{ fallback }}>
      {searchParams.shelf ? (
        <>
          <ReviewBookList uid={params.userId} readStatus={searchParams.shelf} profile={profile} />
          <ReadStatusDrawer />
        </>
      ) : (
        <ReviewListMain uid={params.userId} profile={profile} />
      )}
    </SWRProvider>
  );
}
